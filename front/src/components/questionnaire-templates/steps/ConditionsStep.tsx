import React, { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  QuestionCondition,
  TemplateQuestion,
  QuestionnaireSection,
} from "../../../types/questionnaire-templates";

interface ConditionsStepProps {
  conditions: QuestionCondition[];
  questions: TemplateQuestion[];
  sections: QuestionnaireSection[];
  onAdd: (
    condition: Omit<
      QuestionCondition,
      "id" | "createdAt" | "questionnaireTemplateId"
    >
  ) => void;
  onUpdate: (id: string, data: Partial<QuestionCondition>) => void;
  onDelete: (id: string) => void;
  errors: string[];
}

interface ConditionFormData {
  sourceQuestionId: string;
  targetQuestionId: string;
  conditionType: string;
  expectedValue: string;
}

export const ConditionsStep: React.FC<ConditionsStepProps> = ({
  conditions,
  questions,
  sections,
  onAdd,
  onUpdate,
  onDelete,
  errors,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCondition, setEditingCondition] =
    useState<QuestionCondition | null>(null);
  const [formData, setFormData] = useState<ConditionFormData>({
    sourceQuestionId: "",
    targetQuestionId: "",
    conditionType: "equals",
    expectedValue: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleOpenDialog = (condition?: QuestionCondition) => {
    if (condition) {
      setEditingCondition(condition);
      setFormData({
        sourceQuestionId: condition.sourceQuestionId,
        targetQuestionId: condition.targetQuestionId,
        conditionType: condition.conditionType,
        expectedValue: condition.expectedValue,
      });
    } else {
      setEditingCondition(null);
      setFormData({
        sourceQuestionId: "",
        targetQuestionId: "",
        conditionType: "equals",
        expectedValue: "",
      });
    }
    setFormErrors([]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCondition(null);
    setFormData({
      sourceQuestionId: "",
      targetQuestionId: "",
      conditionType: "equals",
      expectedValue: "",
    });
    setFormErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.sourceQuestionId) {
      errors.push("Source question is required");
    }

    if (!formData.targetQuestionId) {
      errors.push("Target question is required");
    }

    if (formData.sourceQuestionId === formData.targetQuestionId) {
      errors.push("Source and target questions must be different");
    }

    if (!formData.expectedValue.trim()) {
      errors.push("Expected value is required");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const conditionData = {
      sourceQuestionId: formData.sourceQuestionId,
      targetQuestionId: formData.targetQuestionId,
      conditionType: formData.conditionType,
      expectedValue: formData.expectedValue.trim(),
    };

    if (editingCondition) {
      onUpdate(editingCondition.id, conditionData);
    } else {
      onAdd(conditionData);
    }

    handleCloseDialog();
  };

  const handleDelete = (condition: QuestionCondition) => {
    const sourceQuestion = getQuestionById(condition.sourceQuestionId);
    const targetQuestion = getQuestionById(condition.targetQuestionId);

    if (
      window.confirm(
        `Are you sure you want to delete the condition from "${sourceQuestion?.title}" to "${targetQuestion?.title}"?`
      )
    ) {
      onDelete(condition.id);
    }
  };

  const getQuestionById = (id: string) => {
    return questions.find((q) => q.id === id);
  };

  const getSectionById = (id: string) => {
    return sections.find((s) => s.id === id);
  };

  const getQuestionLabel = (question: TemplateQuestion) => {
    const section = getSectionById(question.sectionId);
    return `${section?.title || "Unknown"}: ${question.title}`;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Conditional Logic
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Create conditions that show or hide questions based on answers to other
        questions. This helps create dynamic questionnaires that adapt to user
        responses.
      </Typography>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {questions.length < 2 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          You need at least 2 questions to create conditional logic.
        </Alert>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 3 }}
        >
          Add Condition
        </Button>
      )}

      <List>
        {conditions.map((condition) => {
          const sourceQuestion = getQuestionById(condition.sourceQuestionId);
          const targetQuestion = getQuestionById(condition.targetQuestionId);

          return (
            <ListItem
              key={condition.id}
              sx={{
                mb: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                bgcolor: "background.default",
              }}
            >
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Conditional Rule
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>If:</strong>{" "}
                      {sourceQuestion
                        ? getQuestionLabel(sourceQuestion)
                        : "Unknown Question"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{condition.conditionType}:</strong> &ldquo;
                      {condition.expectedValue}&rdquo;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Then show:</strong>{" "}
                      {targetQuestion
                        ? getQuestionLabel(targetQuestion)
                        : "Unknown Question"}
                    </Typography>
                  </Box>
                }
              />

              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleOpenDialog(condition)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(condition)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      {conditions.length === 0 && questions.length >= 2 && (
        <Card sx={{ textAlign: "center", py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              No conditional logic defined
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add conditions to create dynamic questionnaires
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add First Condition
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Condition Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingCondition ? "Edit Condition" : "Add New Condition"}
        </DialogTitle>

        <DialogContent>
          {formErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create a rule that shows or hides a question based on the answer to
            another question.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Source Question (IF)</InputLabel>
                <Select
                  value={formData.sourceQuestionId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sourceQuestionId: e.target.value,
                    })
                  }
                  label="Source Question (IF)"
                  required
                >
                  {questions.map((question) => (
                    <MenuItem key={question.id} value={question.id}>
                      {getQuestionLabel(question)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Condition Type</InputLabel>
                <Select
                  value={formData.conditionType}
                  onChange={(e) =>
                    setFormData({ ...formData, conditionType: e.target.value })
                  }
                  label="Condition Type"
                >
                  <MenuItem value="equals">Equals</MenuItem>
                  <MenuItem value="not_equals">Not Equals</MenuItem>
                  <MenuItem value="contains">Contains</MenuItem>
                  <MenuItem value="greater_than">Greater Than</MenuItem>
                  <MenuItem value="less_than">Less Than</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Value"
                value={formData.expectedValue}
                onChange={(e) =>
                  setFormData({ ...formData, expectedValue: e.target.value })
                }
                required
                helperText="The value to compare against"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Target Question (THEN SHOW)</InputLabel>
                <Select
                  value={formData.targetQuestionId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetQuestionId: e.target.value,
                    })
                  }
                  label="Target Question (THEN SHOW)"
                  required
                >
                  {questions
                    .filter((q) => q.id !== formData.sourceQuestionId)
                    .map((question) => (
                      <MenuItem key={question.id} value={question.id}>
                        {getQuestionLabel(question)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingCondition ? "Update" : "Add"} Condition
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
