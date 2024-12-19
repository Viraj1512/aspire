import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  Tooltip,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  FaGithub as GitHubIcon,
  FaStar as StarIcon,
  FaEye as EyeIcon,
  FaCodeBranch as BranchIcon,
} from "react-icons/fa";
import { RiErrorWarningLine as IssueIcon } from "react-icons/ri";
import { formatDate } from "../utils";
import { IRelease, IRepository } from "../types";

const useStyles = makeStyles({
  card: {
    borderRadius: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "2px solid #E5E7EB",
    padding: "16px",
    maxWidth: "600px",
    margin: "16px auto",
    cursor: "pointer",
  },
  selected:{
    border: "2px solid #556cd6",
  },
  title: {
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  },
  subtext: {
    color: "#6B7280",
    marginBottom: "4px",
  },
  chip: {
    margin: "4px",
  },
  section: {
    marginBottom: "16px",
  },
  icon: {
    marginRight: "8px",
  },
  stats: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  statsText: {
    marginLeft: "4px",
  }
});

type RepositoryProps = {
  repo: IRepository;
  setSelectedRepo: (repo: IRepository) => void;
  selectedRepo: IRepository | null;
};

const Repository = ({ repo, setSelectedRepo, selectedRepo }: RepositoryProps) => {
  const {
    name,
    description,
    html_url,
    stargazers_count,
    watchers_count,
    default_branch,
    language,
    created_at,
    updated_at,
    pushed_at,
    open_issues_count,
    topics,
    private: isPrivate,
    releases,
  } = repo;

  const classes = useStyles();

  return (
    <Card className={`${classes.card} ${selectedRepo?.id === repo.id ? classes.selected : ""}`} elevation={0} onClick={() => setSelectedRepo(repo)}>
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
              {!!releases?.length && releases?.some((release: IRelease) => !release.seen) && <Chip label="New" size="small" color="error" />}{" "}
              <Typography variant="h5" className={classes.title} gutterBottom>
            {name}
          </Typography>
            </Stack>
          </Box>
         
          <Chip
            label={isPrivate ? "Private" : "Public"}
            size="small"
            color={isPrivate ? "primary" : "secondary"}
          />
        </Stack>

        {/* Stats */}
        <Stack
          direction="row"
          spacing={{ xs: 0, sm: 2 }}
          mb={1}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            '@media (max-width:600px)': {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <div className={classes.stats}>
            <Tooltip title="Default Branch">
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BranchIcon className={classes.icon} />
                <Typography variant="body2" className={classes.statsText}>
                  {default_branch}
                </Typography>
              </Stack>
            </Tooltip>
          </div>
          <div className={classes.stats}>
            <StarIcon className={classes.icon} />
            <Typography variant="body2" className={classes.statsText}>
              Stars: {stargazers_count}
            </Typography>
          </div>

          <div className={classes.stats}>
            <EyeIcon className={classes.icon} />
            <Typography variant="body2" className={classes.statsText}>
              Watchers: {watchers_count}
            </Typography>
          </div>

          <div className={classes.stats}>
            <IssueIcon className={classes.icon} />
            <Typography variant="body2" className={classes.statsText}>
              Open Issues: {open_issues_count}
            </Typography>
          </div>
        </Stack>

        <Typography variant="body2" className={classes.subtext} mb={1}>
          Language: {language || "N/A"}
        </Typography>

        <Typography variant="body2" className={classes.subtext} mb={1}>
          Latest Release: {releases[0]?.version || "N/A"}
        </Typography>

        <Typography variant="body2" className={classes.subtext} mb={2}>
          {description || "No description available."}
        </Typography>

        <div className={classes.section}>
          {topics &&
            topics.length > 0 &&
            topics.map((topic: string) => (
              <Chip
                key={topic}
                label={topic}
                size="small"
                className={classes.chip}
                color="secondary"
              />
            ))}
        </div>


        <Stack
          direction="row"
          spacing={{ xs: 0, sm: 2 }}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            '@media (max-width:600px)': {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          }}
        >
          <Typography variant="body2" className={classes.subtext}>
            <span className={classes.title}>Created:</span>{" "}
            {formatDate(created_at)}
          </Typography>
          <Typography variant="body2" className={classes.subtext}>
            <span className={classes.title}>Updated:</span>{" "}
            {formatDate(updated_at)}
          </Typography>
          <Typography variant="body2" className={classes.subtext}>
            <span className={classes.title}>Last Pushed:</span>{" "}
            {formatDate(pushed_at)}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="small"
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<GitHubIcon />}
          style={{
            padding: "6px 12px",
          }}
        >
          View Repository
        </Button>
      </CardActions>
    </Card>
  );
};

export default Repository;
