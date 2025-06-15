import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Publish as PublishIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { 
  QuestionnaireTemplate, 
  QuestionnaireSection, 
  TemplateQuestion, 
  QuestionCondition,
  QuestionType,
  CertificateType
} from '../../../types/questionnaire-templates';

interface ReviewStepProps {
  templateData: Partial<QuestionnaireTemplate>;
  sections: QuestionnaireSection[];
  questions: TemplateQuestion[];
  conditions: QuestionCondition[];
  onPublish: () => Promise<void>;
  errors: string[];
}

const questionTypeLabels = {
  [QuestionType.Text]: 'Text',
  [QuestionType.Number]: 'Number',
  [QuestionType.Boolean]: 'Yes/No',
  [QuestionType.SingleChoice]: 'Single Choice',
  [QuestionType.MultiChoice]: 'Multiple Choice',
  [QuestionType.Date]: 'Date',
  [QuestionType.FileUpload]: 'File Upload'
};

const certificateTypeLabels = {
  [CertificateType.SelfAssessment]: 'Self Assessment',
  [CertificateType.InspectorRequired]: 'Inspector Required',
  [CertificateType.Both]: 'Both'
};

export const ReviewStep: React.FC<ReviewStepProps> = ({
  templateData,
  sections,
  questions,
  conditions,
  onPublish,
  errors
}) => {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishClick = () => {
    setPublishDialogOpen(true);
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish();
      setPublishDialogOpen(false);
    } catch (error) {
      console.error('Failed to publish:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const getQuestionById = (id: string) => {
    return questions.find(q => q.id === id);
  };

  const getSectionById = (id: string) => {
    return sections.find(s => s.id === id);
  };

  const getQuestionsBySection = (sectionId: string) => {
    return questions
      .filter(q => q.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  };

  const getTotalQuestions = () => questions.length;
  const getRequiredQuestions = () => questions.filter(q => q.isRequired).length;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Review & Publish
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Review your template configuration before publishing. Once published, the template will be available for use.
      </Typography>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }} icon={<WarningIcon />}>
          <Typography variant="subtitle2" gutterBottom>
            Please fix the following issues before publishing:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Template Overview */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Template Overview
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {templateData.title || 'Not specified'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Primary Language
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {templateData.primaryLanguage || 'Not specified'}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {templateData.description || 'No description provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Certificate Type
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {templateData.certificateType ? certificateTypeLabels[templateData.certificateType] : 'Not specified'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Expiration
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {templateData.expirationMonths || 0} months
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" color="text.secondary">
                Target Entity Type
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                ID: {templateData.targetEntityTypeId || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Template Statistics
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {sections.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sections
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {getTotalQuestions()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                  {getRequiredQuestions()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Required
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="secondary">
                  {conditions.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Conditions
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Sections Detail */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sections & Questions
          </Typography>
          
          {sections.map((section) => {
            const sectionQuestions = getQuestionsBySection(section.id);
            
            return (
              <Accordion key={section.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Typography variant="subtitle1">
                      {section.title}
                    </Typography>
                    <Chip
                      label={`${sectionQuestions.length} questions`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {section.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {section.description}
                    </Typography>
                  )}
                  
                  <List dense>
                    {sectionQuestions.map((question) => (
                      <ListItem key={question.id} sx={{ pl: 0 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">
                                {question.title}
                              </Typography>
                              <Chip
                                label={questionTypeLabels[question.questionType]}
                                size="small"
                                variant="outlined"
                              />
                              {question.isRequired && (
                                <Chip
                                  label="Required"
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          }
                          secondary={question.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  {sectionQuestions.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No questions in this section
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </CardContent>
      </Card>

      {/* Conditional Logic */}
      {conditions.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Conditional Logic Rules
            </Typography>
            
            <List>
              {conditions.map((condition) => {
                const sourceQuestion = getQuestionById(condition.sourceQuestionId);
                const targetQuestion = getQuestionById(condition.targetQuestionId);
                const sourceSection = getSectionById(sourceQuestion?.sectionId || '');
                const targetSection = getSectionById(targetQuestion?.sectionId || '');
                
                return (
                  <ListItem key={condition.id} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="body2">
                            <strong>If:</strong> {sourceSection?.title} → {sourceQuestion?.title}
                          </Typography>
                          <Typography variant="body2">
                            <strong>{condition.conditionType}:</strong> &ldquo;{condition.expectedValue}&rdquo;
                          </Typography>
                          <Typography variant="body2">
                            <strong>Then show:</strong> {targetSection?.title} → {targetQuestion?.title}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Publish Button */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Ready to Publish?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Publishing will make this template available for creating questionnaires.
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<PublishIcon />}
              onClick={handlePublishClick}
              disabled={errors.length > 0 || isPublishing}
            >
              {isPublishing ? 'Publishing...' : 'Publish Template'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Publish Confirmation Dialog */}
      <Dialog
        open={publishDialogOpen}
        onClose={() => !isPublishing && setPublishDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Publication</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to publish this template?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Once published, the template will be available for creating questionnaires.
            You can still edit the template after publishing, but changes will create a new version.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setPublishDialogOpen(false)}
            disabled={isPublishing}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmPublish}
            variant="contained"
            disabled={isPublishing}
          >
            {isPublishing ? 'Publishing...' : 'Confirm Publish'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
