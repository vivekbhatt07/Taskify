import { FC, useState } from "react";
import {
  TolltipIconAction,
  ModalProvider,
  LightLoader,
  DarkLoader,
} from "../../components";
import { PageContainer } from "../../layout";
import { ProjectCard } from "./components";
import { Add } from "@mui/icons-material";
import ProjectForm from "../../components/ProjectForm";
import { useMode, useProject } from "../../context";
interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const { state, isLoading } = useProject();
  const { isDarkTheme } = useMode();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
    useState<boolean>(false);

  const openAddProjectModal = () => setIsAddProjectModalOpen(true);
  const closeAddProjectModal = () => setIsAddProjectModalOpen(false);

  const projectGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 300px))",
    gap: "32px",
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-8">
        <div className="flex gap-6 items-center">
          <h2 className="text-2xl">Project Management</h2>
          {state.projectList.length !== 0 && (
            <ModalProvider
              isOpen={isAddProjectModalOpen}
              title="Add Project"
              OpenAction={
                <TolltipIconAction
                  position="top"
                  title="Add Project"
                  onClick={openAddProjectModal}
                >
                  <Add />
                </TolltipIconAction>
              }
              closeModal={closeAddProjectModal}
            >
              <ProjectForm closeAction={closeAddProjectModal} />
            </ModalProvider>
          )}
        </div>
        {isLoading ? (
          isDarkTheme ? (
            <DarkLoader />
          ) : (
            <LightLoader />
          )
        ) : state.projectList.length === 0 ? (
          <div className="mx-auto flex flex-col gap-6">
            <div className="mx-auto">
              <ModalProvider
                isOpen={isAddProjectModalOpen}
                title="Add Project"
                OpenAction={
                  <TolltipIconAction
                    position="top"
                    title="Add Project"
                    onClick={openAddProjectModal}
                    iconBtnSx={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "16px",
                    }}
                  >
                    <Add sx={{ width: "80px", height: "80px" }} />
                  </TolltipIconAction>
                }
                closeModal={closeAddProjectModal}
              >
                <ProjectForm closeAction={closeAddProjectModal} />
              </ModalProvider>
            </div>
            <h3 className="text-center text-3xl">Start adding projects</h3>
          </div>
        ) : (
          <div style={projectGridStyle}>
            {state.projectList.map((project) => {
              return <ProjectCard key={project._id} projectData={project} />;
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
