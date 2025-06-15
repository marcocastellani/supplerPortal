import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import { QuestionnaireSection } from '../../../types/questionnaire-templates';

interface SectionsStepProps {
  sections: QuestionnaireSection[];
  onAdd: (section: Omit<QuestionnaireSection, 'id' | 'createdAt' | 'questionnaireTemplateId'>) => void;
  onUpdate: (id: string, data: Partial<QuestionnaireSection>) => void;
  onDelete: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  errors: string[];
}

interface SectionFormData {
  title: string;
  description: string;
}

export const SectionsStep: React.FC<SectionsStepProps> = ({
  sections,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
  errors
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<QuestionnaireSection | null>(null);
  const [formData, setFormData] = useState<SectionFormData>({
    title: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleOpenDialog = (section?: QuestionnaireSection) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        title: section.title,
        description: section.description || ''
      });
    } else {
      setEditingSection(null);
      setFormData({
        title: '',
        description: ''
      });
    }
    setFormErrors([]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingSection(null);
    setFormData({ title: '', description: '' });
    setFormErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!formData.title.trim()) {
      errors.push('Section title is required');
    }
    
    if (formData.title.length > 200) {
      errors.push('Section title must be less than 200 characters');
    }
    
    if (formData.description.length > 1000) {
      errors.push('Section description must be less than 1000 characters');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const sectionData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      order: editingSection?.order || sections.length + 1,
      translations: {},
      questions: []
    };

    if (editingSection) {
      onUpdate(editingSection.id, sectionData);
    } else {
      onAdd(sectionData);
    }

    handleCloseDialog();
  };

  const handleDelete = (section: QuestionnaireSection) => {
    if (window.confirm(`Are you sure you want to delete section "${section.title}"? This will also delete all questions in this section.`)) {
      onDelete(section.id);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Template Sections
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Organize your questionnaire into logical sections. Each section can contain multiple questions.
      </Typography>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Add Section
      </Button>

      <List>
        {sections.map((section) => (
          <ListItem
            key={section.id}
            sx={{
              mb: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.default'
            }}
          >
            <IconButton sx={{ mr: 1 }}>
              <DragIcon />
            </IconButton>
            
            <ListItemText
              primary={section.title}
              secondary={
                <Box>
                  {section.description && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {section.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Order: {section.order} • Questions: {section.questions?.length || 0}
                  </Typography>
                </Box>
              }
            />
            
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleOpenDialog(section)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() => handleDelete(section)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {sections.length === 0 && (
        <Card sx={{ textAlign: 'center', py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              No sections created yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your first section to organize your questionnaire
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add First Section
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Section Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingSection ? 'Edit Section' : 'Add New Section'}
        </DialogTitle>
        
        <DialogContent>
          {formErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <TextField
            fullWidth
            label="Section Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Section Description (Optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            helperText="Provide additional context or instructions for this section"
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingSection ? 'Update' : 'Add'} Section
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
