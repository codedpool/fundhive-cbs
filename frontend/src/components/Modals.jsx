import React from 'react';
import CreateProject from './CreateProject';
import { UserProfile } from './UserProfile';

function Modals({
  showProfile,
  setShowProfile,
  showCreateProject,
  onCloseCreateProject,
  handleDeleteProject,
  userProfile,
}) {
  return (
    <>
      {showProfile && (
        <UserProfile 
          onClose={() => setShowProfile(false)} 
          handleDeleteProject={handleDeleteProject}
          userProfile={userProfile}
        />
      )}
      {showCreateProject && <CreateProject onClose={onCloseCreateProject} />}
    </>
  );
}

export default Modals;