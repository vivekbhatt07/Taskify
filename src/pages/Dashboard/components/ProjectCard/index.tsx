import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { ModalProvider, TolltipIconAction } from "../../../../components";
import ProjectForm from "../../../../components/ProjectForm";
import { useProject } from "../../../../context";
import { Project } from "../../../../types";
import { ArrowForward } from "@mui/icons-material";
import { truncateString } from "../../../../utils";

type ProjectCardType = {
  projectData: Project;
};

const ProjectCard: FC<ProjectCardType> = ({ projectData }) => {
  const navigate = useNavigate();
  const { deleteProjectHandler } = useProject();

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] =
    useState<boolean>(false);

  const openEditProjectModal = () => setIsEditProjectModalOpen(true);
  const closeEditProjectModal = () => setIsEditProjectModalOpen(false);
  return (
    <div className="border border-[#ddd] p-4 rounded-lg flex flex-col gap-4 hover:border-[#5b21b6] transition-all duration-300">
      <div className="flex flex-col gap-2">
        <h3>{truncateString(projectData.title, 20)}</h3>
        <p>{truncateString(projectData.description, 20)}</p>
      </div>
      <div className="flex justify-between">
        <TolltipIconAction
          position="bottom"
          title="Delete"
          iconBtnSx={{ width: "35px", height: "35px" }}
          onClick={(e) => {
            e.stopPropagation();
            if (projectData?._id) {
              deleteProjectHandler(projectData?._id);
            }
          }}
        >
          <Delete sx={{ fontSize: "20px" }} />
        </TolltipIconAction>
        <TolltipIconAction
          onClick={() => navigate(`/${projectData._id}`)}
          iconBtnSx={{ width: "35px", height: "35px" }}
          position="bottom"
          title="Open"
        >
          <ArrowForward sx={{ fontSize: "20px" }} />
        </TolltipIconAction>
        <ModalProvider
          isOpen={isEditProjectModalOpen}
          title="Edit Project"
          OpenAction={
            <TolltipIconAction
              position="bottom"
              title="Edit"
              iconBtnSx={{ width: "35px", height: "35px" }}
              onClick={(e) => {
                e.stopPropagation();
                openEditProjectModal();
              }}
            >
              <Edit sx={{ fontSize: "20px" }} />
            </TolltipIconAction>
          }
          closeModal={closeEditProjectModal}
        >
          <ProjectForm
            closeAction={closeEditProjectModal}
            projectData={projectData}
            isEdit
          />
        </ModalProvider>
      </div>
    </div>
  );
};

export default ProjectCard;
