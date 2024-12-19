import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Avatar,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatDate } from "../utils";
import { IRelease } from "../types";

const useStyles = makeStyles({
  card: {
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    maxWidth: "600px",
    margin: "16px auto",
    cursor: "pointer"
  },
  title: {
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "8px",
  },
  subtext: {
    color: "#6B7280",
    marginBottom: "4px",
  },
  section: {
    marginBottom: "16px",
  },
  downloadButton: {
    marginTop: "16px",
    padding: "6px 12px",
  },
  icon: {
    marginRight: "8px",
  },
  authorSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
  },
  avatar: {
    marginRight: "8px",
  },
});

type ReleaseNotesProps = {
  release: IRelease;
  handleMarkAsSeen: (id: string) => void;
};

const ReleaseNotes = ({ release, handleMarkAsSeen }: ReleaseNotesProps) => {
  const classes = useStyles();

  if (!release) return null;

  return (
    <Card className={classes.card} onClick={() => handleMarkAsSeen(release.id)}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          mb={1}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
              }}
            >
              {!release.seen && <Chip label="New" size="small" color="error" />}{" "}
              <Typography variant="h5" className={classes.title} gutterBottom>
                Release - {release.name}
              </Typography>
            </Stack>
          </Box>
          <Chip label={release.tag_name} size="small" color="primary" />
        </Stack>

        <div className={classes.authorSection}>
          <Avatar
            src={release.author.avatar_url}
            alt={release.author.login}
            className={classes.avatar}
          />
          <Typography variant="body2" className={classes.subtext}>
            Released by{" "}
            <a
              href={release.author.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1F2937" }}
            >
              {release.author.login}
            </a>
          </Typography>
        </div>

        <Typography variant="body2" className={classes.subtext} gutterBottom>
          {release.body || "No description available."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body2" className={classes.subtext}>
          Released on: {formatDate(release.created_at)}
        </Typography>

        {release.html_url && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.downloadButton}
          >
            View Release on GitHub
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReleaseNotes;
