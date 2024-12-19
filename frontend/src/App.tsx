import { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ORIGIN_REPOSITORIES,
  GET_REPOSITORIES,
} from "./graphql/queries/repositories";
import Repository from "./components/Repository";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ReleaseNotes from "./components/ReleaseNotes";
import { IRelease, IRepository } from "./types";
import { GET_RELEASES } from "./graphql/queries/releases";
import { ADD_REPOSITORY } from "./graphql/mutations/repositories";
import { MARK_RELEASE_SEEN } from "./graphql/mutations/releases";

function App() {
  const [repoToTrack, setRepoToTrack] = useState<IRepository | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<IRepository | null>(null);

  // Fetch all the repositories from origin
  const { loading, error, data, refetch: refetchOriginRepositories } = useQuery(GET_ORIGIN_REPOSITORIES);

  // Fetch all the releases for the selected repository
  const {
    loading: releaseLoading,
    error: releaseError,
    data: releaseData,
    refetch: refetchReleases,
  } = useQuery(GET_RELEASES, {
    variables: {
      owner: selectedRepo?.owner?.login,
      repo: selectedRepo?.name,
    },
    skip: !selectedRepo,
  });

  // Fetch all the tracked repositories from the database
  const {
    loading: repositoriesLoading,
    error: repositoriesError,
    data: repositoriesData,
    refetch: refetchRepositories,
  } = useQuery(GET_REPOSITORIES);

  // Mutations
  const [addRepository] = useMutation(ADD_REPOSITORY);
  const [markReleaseSeen] = useMutation(MARK_RELEASE_SEEN);

  // Refetch the releases when the selected repository changes
  useEffect(() => {
    if (selectedRepo) {
      refetchReleases();
    }
  }, [selectedRepo]);

  if (error || releaseError || repositoriesError)
    return (
      <p>
        Error :{" "}
        {error?.message || releaseError?.message || repositoriesError?.message}
      </p>
    );

  const handleTrackRepository = () => {
    addRepository({
      variables: {
        owner: repoToTrack?.owner?.login,
        repo: repoToTrack?.name,
      },
    }).then(() => {
      setRepoToTrack(null);
      refetchRepositories();
    });
  };

  const handleMarkAsSeen = (id: string) => {
    markReleaseSeen({
      variables: {
        id,
      },
    }).then(() => {
      refetchRepositories();
    });
  };

  const refetchAll = () => {
    refetchRepositories();
    refetchOriginRepositories();
    if (selectedRepo) {
      refetchReleases();
    }
  };

  return (
    <Box component="section" p={4}>
      <Grid container spacing={4}>
        {/* Repositories */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction="row" alignItems="center" mb={2} spacing={2}>
            <Typography variant="h4">
              Repositories
            </Typography>
            <Button variant="contained" onClick={refetchAll}>
              Refresh
            </Button>
          </Stack>
          {loading || repositoriesLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Stack direction="row" spacing={2} mb={0.5}>
                <Autocomplete
                  disablePortal
                  options={data.originRepositories.filter(
                    (repo: IRepository) =>
                      !repositoriesData.repositories.find(
                        (r: IRepository) => r.id === repo.id
                      )
                  )}
                  sx={{ width: "100%" }}
                  value={repoToTrack}
                  onChange={(_, newValue) => {
                    setRepoToTrack(newValue);
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Repository" />
                  )}
                />
                <Button
                  variant="contained"
                  sx={{ minWidth: "150px" }}
                  onClick={handleTrackRepository}
                >
                  Track
                </Button>
              </Stack>
              <Typography variant="subtitle2" gutterBottom>
                Select a repository to track it.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  maxHeight: "80vh",
                  overflow: "auto",
                  paddingRight: "8px",
                }}
              >
                {repositoriesData.repositories.map((repo: IRepository) => {
                  let repoData = data.originRepositories.find(
                    (r: IRepository) => r.id === repo.id
                  );

                  repoData = {
                    ...repoData,
                    ...repo,
                  };

                  return (
                    <Repository
                      key={repoData.id}
                      repo={repoData}
                      setSelectedRepo={setSelectedRepo}
                      selectedRepo={selectedRepo}
                    />
                  );
                })}
              </Paper>
            </>
          )}
        </Grid>

        {/* Release Notes */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4">Release Notes:</Typography>
          {releaseLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : releaseData?.releases?.length > 0 ? (
            releaseData.releases.map((release: IRelease) => {
              let releaseData = release;
              releaseData = {
                ...releaseData,
                ...(repositoriesData.repositories
                  ?.find((r: IRepository) => r.id === selectedRepo?.id)
                  ?.releases?.find((r: IRelease) => r.id === releaseData.id) ||
                  []),
              };
              return (
                <ReleaseNotes
                  key={releaseData.id}
                  release={releaseData}
                  handleMarkAsSeen={handleMarkAsSeen}
                />
              );
            })
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={200}
            >
              <Typography variant="h6">
                {selectedRepo
                  ? "No release notes found"
                  : "Select a repository to track it"}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
