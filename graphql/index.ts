export const getuserquery = () => {
  return ` query GetUser($email: String!) {
     user(by: { email: $email }) {
       id
       name
       email
       avatarUrl
       description
       githubUrl
       linkedinUrl
     }
   }
  `;
};

export const createuserMutation = () => {
  return `
    mutation CreateUser($input: UserCreateInput!) {
      userCreate(input: $input) {
        user {
          name
          email
          avatarUrl
          description
          githubUrl
          linkedinUrl
          id
        }
      }
    }
  `;
};
export const createProjectMutation = `
	mutation CreateProject($input: ProjectsCreateInput!) {
		projectsCreate(input: $input) {
			projects {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;
