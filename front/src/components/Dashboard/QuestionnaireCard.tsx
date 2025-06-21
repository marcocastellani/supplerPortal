import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  Business,
  CalendarToday,
  Assignment,
  MoreVert,
} from "@mui/icons-material";
import { UpcomingQuestionnaireDto } from "../../types/dashboard";
import { StatusChip } from "./StatusChip";
import { PriorityChip } from "./PriorityChip";
import {
  sanitizeUserInput,
  sanitizeEntityCode,
  sanitizeAndTruncate,
} from "../../utils/sanitization";

interface QuestionnaireCardProps {
  questionnaire: UpcomingQuestionnaireDto;
  onActionClick?: (questionnaire: UpcomingQuestionnaireDto) => void;
}

/**
 * QuestionnaireCard component with XSS protection via input sanitization [IV][REH]
 *
 * Displays questionnaire information with proper sanitization of all
 * user-generated content to prevent XSS attacks.
 */
export const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  questionnaire,
  onActionClick,
}) => {
  // ✅ Sanitize all user-generated content to prevent XSS [IV][REH]
  const sanitizedTitle = sanitizeAndTruncate(questionnaire.title, 80);
  const sanitizedType = sanitizeUserInput(questionnaire.type);
  const sanitizedSupplierName = sanitizeAndTruncate(
    questionnaire.supplierName,
    40
  );
  const sanitizedSupplierCode = sanitizeEntityCode(questionnaire.supplierCode);
  const sanitizedId = sanitizeEntityCode(
    questionnaire.id?.slice(-8)?.toUpperCase()
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysText = (days: number, isOverdue: boolean) => {
    if (isOverdue) return "Scaduto";
    if (days === 0) return "Scade oggi";
    if (days === 1) return "Scade domani";
    return `${days} giorni`;
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box flex={1} title={sanitizedTitle}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                mb: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {sanitizedTitle}
            </Typography>

            <Chip
              label={sanitizedType}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.75rem",
                height: 24,
                borderColor: "primary.main",
                color: "primary.main",
              }}
            />
          </Box>

          <IconButton
            size="small"
            sx={{ ml: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.(questionnaire);
            }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Content */}
        <Stack spacing={2}>
          {/* Supplier Info */}
          <Box display="flex" alignItems="center" gap={1}>
            <Business sx={{ fontSize: 16, color: "text.secondary" }} />
            <Box title={sanitizedSupplierName} sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {sanitizedSupplierName}
              </Typography>
            </Box>
            <Chip
              label={sanitizedSupplierCode}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 20,
              }}
            />
          </Box>

          {/* Due Date */}
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Scadenza: {formatDate(questionnaire.dueDate)}
            </Typography>
          </Box>

          {/* Status & Priority Row */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
          >
            <StatusChip status={questionnaire.status as any} />
            <PriorityChip
              daysToDeadline={questionnaire.daysToDeadline}
              isOverdue={questionnaire.isOverdue}
            />
          </Box>
        </Stack>
      </CardContent>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          pb: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "grey.50",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Assignment sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" color="text.secondary">
              ID: {sanitizedId}
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: questionnaire.isOverdue ? "error.main" : "text.secondary",
            }}
          >
            {getDaysText(questionnaire.daysToDeadline, questionnaire.isOverdue)}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
