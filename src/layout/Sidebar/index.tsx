import {List, ListItem, ListItemText} from "@mui/material";
import { FC } from "react";
import dashboardSidebarItems from "./dashboardSidebarItems";
import DashboardIcon from '@mui/icons-material/Dashboard';


interface SidebarItemsProps {
}

const SidebarItems: FC<SidebarItemsProps> = ({}) => {



    console.log('dashboardSidebarItems', dashboardSidebarItems);

    return (
        <List>
            <ListItem>
                <DashboardIcon />
                <ListItemText primary="Dashboard" />
            </ListItem>
        </List>
    );
}

export default SidebarItems;

/*
const renderedLinks = links.map((link) =>{
    return <Link key={link.label} to = {link.path} activeClassName = 'font-bold border-l-4 border-white-500 pl-2 py-3'>
      <Box style = {{
        display: 'flex',
        alignItems: 'center',
      }}>
        {link.label === 'Dashboard' ? <DashboardIcon/> : null}
        {link.label === 'Sınıflar' ? <ClassIcon/> : null}
        {link.label === 'Ödevler' ? <TaskIcon/> : null}
        {link.label === 'Sınavlar' ? <ArticleIcon/> : null}
        {link.label === 'Notlar' ? <GradingIcon/> : null}
        {link.label === 'Ayarlar' ? <SettingsIcon/> : null}
        {link.label === 'Kayıt Oluştur' ? <AppRegistrationIcon/> : null}
        {link.label}
      </Box>

    </Link>
  })



  return (
    <>
      <Box display = 'flex'flexDirection = 'column' alignItems = 'stretch' style = {{
        backgroundColor: '#11192a',
        width: '200px',
        height: '100%',
        color: 'white',
        paddingTop: '20px',
        paddingLeft: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
      }}
      >
          <img src="/images/logo.png" alt="brand logo" style={{ width: "120px", height: "120px"}}/>
          {renderedLinks}
      </Box>
    </>
  );
};
 */