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
  FormControlLabel,
  Checkbox,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material";
import {
  TemplateQuestion,
  QuestionnaireSection,
  QuestionType,
} from "../../../types/questionnaire-templates";

interface QuestionsStepProps {
  questions: TemplateQuestion[];
  sections: QuestionnaireSection[];
  onAdd: (
    question: Omit<
      TemplateQuestion,
      "id" | "createdAt" | "questionnaireTemplateId"
    >
  ) => void;
  onUpdate: (id: string, data: Partial<TemplateQuestion>) => void;
  onDelete: (id: string) => void;
  onReorder: (sectionId: string, fromIndex: number, toIndex: number) => void;
  errors: string[];
}

interface QuestionFormData {
  title: string;
  description: string;
  questionType: QuestionType;
  sectionId: string;
  isRequired: boolean;
  configuration: any;
}

const questionTypeLabels = {
  [QuestionType.Text]: "Text",
  [QuestionType.Number]: "Number",
  [QuestionType.Boolean]: "Yes/No",
  [QuestionType.SingleChoice]: "Single Choice",
  [QuestionType.MultiChoice]: "Multiple Choice",
  [QuestionType.Date]: "Date",
  [QuestionType.FileUpload]: "File Upload",
};

export const QuestionsStep: React.FC<QuestionsStepProps> = ({
  questions,
  sections,
  onAdd,
  onUpdate,
  onDelete,
  onReorder,
  errors,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<TemplateQuestion | null>(null);
  const [formData, setFormData] = useState<QuestionFormData>({
    title: "",
    description: "",
    questionType: QuestionType.Text,
    sectionId: "",
    isRequired: false,
    configuration: {},
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleOpenDialog = (question?: TemplateQuestion) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        title: question.title,
        description: question.description || "",
        questionType: question.questionType,
        sectionId: question.sectionId,
        isRequired: question.isRequired,
        configuration: question.configuration || {},
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        title: "",
        description: "",
        questionType: QuestionType.Text,
        sectionId: sections[0]?.id || "",
        isRequired: false,
        configuration: {},
      });
    }
    setFormErrors([]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingQuestion(null);
    setFormData({
      title: "",
      description: "",
      questionType: QuestionType.Text,
      sectionId: "",
      isRequired: false,
      configuration: {},
    });
    setFormErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.title.trim()) {
      errors.push("Question title is required");
    }

    if (formData.title.length > 500) {
      errors.push("Question title must be less than 500 characters");
    }

    if (!formData.sectionId) {
      errors.push("Question must belong to a section");
    }

    if (formData.description.length > 1000) {
      errors.push("Question description must be less than 1000 characters");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const sectionQuestions = questions.filter(
      (q) => q.sectionId === formData.sectionId
    );

    const questionData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      questionType: formData.questionType,
      sectionId: formData.sectionId,
      isRequired: formData.isRequired,
      order: editingQuestion?.order || sectionQuestions.length + 1,
      configuration: formData.configuration,
      translations: {},
      conditions: [],
    };

    if (editingQuestion) {
      onUpdate(editingQuestion.id, questionData);
    } else {
      onAdd(questionData);
    }

    handleCloseDialog();
  };

  const handleDelete = (question: TemplateQuestion) => {
    if (
      window.confirm(
        `Are you sure you want to delete question "${question.title}"?`
      )
    ) {
      onDelete(question.id);
    }
  };

  const getSectionName = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    return section?.title || "Unknown Section";
  };

  const getQuestionsBySection = (sectionId: string) => {
    return questions
      .filter((q) => q.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Template Questions
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Add questions to your template sections. Each question can be customized
        with different types and validation rules.
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

      {sections.length === 0 ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You need to create at least one section before adding questions.
        </Alert>
      ) : (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ mb: 3 }}
        >
          Add Question
        </Button>
      )}

      {sections.map((section) => {
        const sectionQuestions = getQuestionsBySection(section.id);

        return (
          <Card key={section.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>

              {sectionQuestions.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  No questions in this section yet
                </Typography>
              ) : (
                <List>
                  {sectionQuestions.map((question) => (
                    <ListItem
                      key={question.id}
                      sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: "background.paper",
                      }}
                    >
                      <IconButton sx={{ mr: 1 }}>
                        <DragIcon />
                      </IconButton>

                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle1">
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
                        secondary={
                          <Box>
                            {question.description && (
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {question.description}
                              </Typography>
                            )}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Order: {question.order}
                            </Typography>
                          </Box>
                        }
                      />

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleOpenDialog(question)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDelete(question)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        );
      })}

      {questions.length === 0 && sections.length > 0 && (
        <Card sx={{ textAlign: "center", py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              No questions created yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your first question to get started
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add First Question
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Question Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingQuestion ? "Edit Question" : "Add New Question"}
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

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Question Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Question Description (Optional)"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                helperText="Provide additional context or instructions for this question"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Section</InputLabel>
                <Select
                  value={formData.sectionId}
                  onChange={(e) =>
                    setFormData({ ...formData, sectionId: e.target.value })
                  }
                  label="Section"
                  required
                >
                  {sections.map((section) => (
                    <MenuItem key={section.id} value={section.id}>
                      {section.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Question Type</InputLabel>
                <Select
                  value={formData.questionType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      questionType: e.target.value as QuestionType,
                    })
                  }
                  label="Question Type"
                >
                  {Object.entries(questionTypeLabels).map(([value, label]) => (
                    <MenuItem key={value} value={parseInt(value)}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isRequired}
                    onChange={(e) =>
                      setFormData({ ...formData, isRequired: e.target.checked })
                    }
                  />
                }
                label="Required question"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingQuestion ? "Update" : "Add"} Question
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
