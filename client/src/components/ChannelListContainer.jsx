import React , { useState } from 'react';
import { Channel, ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

import MeetChatIcon from '../assets/assets/meetchat.png';
import LogoutIcon from '../assets/assets/logout.png';

const cookies = new Cookies();
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
       <div className="channel-list__sidebar__icon1">
          <div className="icon1__inner">
                  <img src={MeetChatIcon} alt="MeetChat" width="32" />
          </div>
       </div>
       <div className="channel-list__sidebar__icon2">
          <div className="icon1__inner" onClick={logout}>
                  <img src={LogoutIcon} alt="Logout" width="30" />
          </div>
       </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-List__header">
     <p className="channel-List__header__text">Meet-Messanger</p>
  </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setIsEditing, setCreateType ,setToggleContainer }) => {
  
  const { client } = useChatContext();

  const logout = () => {
    // here we use remove for loging out all the cookies
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
}
const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
         <CompanyHeader />
         <ChannelSearch />
         <ChannelList 
            filters={{filters}}
            channelRenderFilterFn={customChannelTeamFilter}
            List={(listProps) => (
              <TeamChannelList 
                 {...listProps}
                 type="team"
                 isCreating={isCreating}
                   setIsCreating={setIsCreating}
                   setCreateType ={setCreateType}
                   setIsEditing={setIsEditing}
                   setToggleContainer={setToggleContainer}
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview 
                {...previewProps}
                setToggleContainer={setToggleContainer}
                type="team"
              />
            )}
         />
         <ChannelList 
            filters={{filters}}
            channelRenderFilterFn={customChannelMessagingFilter}
            List={(listProps) => (
              <TeamChannelList 
                 {...listProps}
                 type="messaging"
                 isCreating={isCreating}
                   setIsCreating={setIsCreating}
                   setCreateType ={setCreateType}
                   setIsEditing={setIsEditing}
                   setToggleContainer={setToggleContainer}
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview 
                {...previewProps}
                setToggleContainer={setToggleContainer}
                type="messaging"
              />
            )}
         />
      </div>
    </>
  );
}
const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            </div>
        </>
    )

}
export default ChannelListContainer;
