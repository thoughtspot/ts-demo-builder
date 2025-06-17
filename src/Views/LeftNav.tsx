import { useState } from "react";
import { Settings } from "../Settings/SettingsConfiguration";
import * as HeroIcons from 'react-icons/hi2';
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { Page, PageType, UserContext } from "../App";
import { ThoughtSpotObject } from "../Settings/ThoughtSpotObjectConfiguration";
import { User } from "../Settings/UserConfiguration";

interface LeftNavProps {
    settings: Settings,
    showSettings: boolean,
    setSelectedPage: (page: Page) => void,
    setShowSettings: (show: boolean) => void,
    setThoughtSpotObject: (thoughtSpotObject: ThoughtSpotObject | null) => void,
}
const LeftNav: React.FC<LeftNavProps> = ({settings, showSettings, setSelectedPage, setShowSettings, setThoughtSpotObject}) => {
    const [wideMode, setWideMode] = useState<boolean>(false);
    const [localTimeout, setLocalTimeout] = useState<any>(null);
    return (
      <UserContext.Consumer>
        {({user}) => (
        <div 
        onMouseEnter={()=>{
          let timeout = setTimeout(()=>setWideMode(true), 200)
          setLocalTimeout(timeout);
        }}
        onMouseLeave={()=>{
          setWideMode(false);
          clearTimeout(localTimeout);
        }} 
            className={"fixed h-full flex flex-col p-3 z-30 " + (wideMode ? "w-64" : "w-16")} 
            style={{
              top:'4rem', height:'calc(100vh - 4rem)',
              backgroundColor:settings.style.leftNavColor, 
              borderRight: (settings.style.leftNavColor == "#ffffff") ? '1px solid #cccccc' : "none",
              transition: 'width .2s'}}>
        <div className="flex flex-col space-y-3 h-full">
          {settings.homePage && settings.homePage.enabled && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.ANALYTICSHOME})
              setThoughtSpotObject(null);
            }
            } >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiHome style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.homePage.name}
                  </div>                    
              )}
            </div>
          )}
          {settings.subMenus.map((subMenu, index) => {
            if (subMenu.userPermissions && subMenu.userPermissions.length > 0 && subMenu.userPermissions.find((permission) => permission.user.name === user.name && permission.denied)) {
              return null;
            }
            // @ts-ignore
            const SelectedIcon: any = HeroIcons[subMenu.icon];
            return (
              <div key={index} className={"flex flex-row items-centere p-1 hover:cursor-pointer rounded-md hover:font-bold"} onClick={()=>{
                setSelectedPage({
                  type: PageType.SUBMENU,
                  subMenu: subMenu,
                })
                setWideMode(false);
                setThoughtSpotObject(null);
              }}>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                    {SelectedIcon && <SelectedIcon style={{color: settings.style.iconColor}}/>}
                  </div>
                </div>
                {wideMode && (
                    <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                        {subMenu.name}
                    </div>                    
                )}
                
              </div>
            );
          })}
          {/* My Reports */}
          {settings.myReports && settings.myReports.enabled && user.selfService && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.MYREPORTS})
              setThoughtSpotObject(null);
            }} >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiDocumentText style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.myReports.name}
                  </div>                    
              )}
              </div>
          )}
          {/* Favorites */}
          {settings.favorites && settings.favorites.enabled && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.FAVORITES})
              setThoughtSpotObject(null);
            }
            } >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiStar style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.favorites.name}
                  </div>                    
              )}
            </div>
          )}
          {/* Simple Search */}
          {settings.simpleSearch && settings.simpleSearch.enabled && user.selfService && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.SIMPLESEARCH})
              setThoughtSpotObject(null);
            }} >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiChartBar style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.simpleSearch.name}
                  </div>                    
              )}
              </div>
          )}
          {/* Simple Sage */}
          {settings.simpleSage && settings.simpleSage.enabled && user.selfService && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.SIMPLESAGE})
              setThoughtSpotObject(null);
            }} >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiMagnifyingGlassCircle style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.simpleSage.name}
                  </div>                    
              )}
              </div>
          )}
          {/* Simple Full App */}
          {settings.simpleFullApp && settings.simpleFullApp.enabled && (
            <div className="flex flex-row items-center p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setSelectedPage({type: PageType.SIMPLEFULLAPP})
              setThoughtSpotObject(null);
            }} >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiTableCells style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      {settings.simpleFullApp.name}
                  </div>                    
              )}
              </div>
          )}
           <div className="flex flex-row h-full items-end p-1 hover:cursor-pointer rounded-md hover:font-bold" onClick={()=>{
              setWideMode(false);
              setShowSettings(!showSettings)
            }
            } >
              <div className="flex flex-col">
                <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                  <HeroIcons.HiCog style={{color: settings.style.iconColor}}/>
                </div>
              </div>
              {wideMode && (
                  <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                      Settings
                  </div>                    
              )}
          </div>
        </div>
      </div>
        )}
      </UserContext.Consumer>
    );
}
export default LeftNav;