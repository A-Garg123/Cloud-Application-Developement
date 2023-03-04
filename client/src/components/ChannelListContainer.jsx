import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
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

const ChannelListContainer = () => {
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
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
         <CompanyHeader />
         <ChannelSearch />
         <ChannelList 
            filters={{}}
            channelRenderFilterFn={() => {}}
            List={(listProps) => (
              <TeamChannelList 
                 {...listProps}
                 type="team"
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview 
                {...previewProps}
                type="team"
              />
            )}
         />
         <ChannelList 
            filters={{}}
            channelRenderFilterFn={() => {}}
            List={(listProps) => (
              <TeamChannelList 
                 {...listProps}
                 type="messaging"
              />
            )}
            Preview={(previewProps) => (
              <TeamChannelPreview 
                {...previewProps}
                type="messaging"
              />
            )}
         />
      </div>
    </>
  );
}

export default ChannelListContainer;
