import { FC, ReactNode, useState, ChangeEvent, FormEvent } from "react";
import { TextField } from "@mui/material";

import { TextButton } from "../../components";
import { useProject } from "../../context";

import { Project } from "../../types";

interface ProjectFormDataType {
  title: string;
  description: string;
}

interface ProjectFormProps {
  children: ReactNode;
  closeAction: () => void;
  isEdit: Boolean;
  projectData: Project;
}

const ProjectForm: FC<ProjectFormProps> = ({
  closeAction,
  isEdit,
  projectData,
}): ReactNode => {
  const { updateProjectHandler, addProjectHandler } = useProject();

  const [projectFormData, setProjectFormData] = useState<ProjectFormDataType>({
    title: isEdit ? projectData.title : "",
    description: isEdit ? projectData.description : "",
  });

  const handleProjectFormDataInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectFormData((prevProjectFormData) => {
      return { ...prevProjectFormData, [name]: value };
    });
  };

  const handleProjectFormDataSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateProjectHandler(projectData._id, projectFormData);
    } else {
      addProjectHandler(projectFormData);
    }
    closeAction();
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleProjectFormDataSubmit}
      >
        {/* NAME */}
        <TextField
          variant="outlined"
          label="Title"
          name="title"
          type="text"
          value={projectFormData.title}
          onChange={handleProjectFormDataInput}
          required
        />
        {/* DESCRIPTION */}
        <TextField
          variant="outlined"
          label="Description"
          name="description"
          type="text"
          value={projectFormData.description}
          onChange={handleProjectFormDataInput}
          required
        />
        <div>
          <TextButton type="submit">{isEdit ? "Update" : "Add"}</TextButton>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
