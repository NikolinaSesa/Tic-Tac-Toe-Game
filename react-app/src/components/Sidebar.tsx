import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const style = {
  bgcolor: "white",
};

interface Props {
  name: string;
  onLogout: () => void;
  onCreateNewGame: () => void;
  onJoin: () => void;
  onHistory: () => void;
}

const Sidebar = ({
  name,
  onLogout,
  onCreateNewGame,
  onJoin,
  onHistory,
}: Props) => {
  return (
    <>
      <List sx={style} component="nav">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon fontSize="medium" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
        <Divider />
        <ListItem button onClick={onCreateNewGame}>
          <ListItemAvatar>
            <Avatar>
              <AddCircleOutlineOutlinedIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Create a new game" />
        </ListItem>
        <ListItem button onClick={onJoin}>
          <ListItemAvatar>
            <Avatar>
              <VideogameAssetOutlinedIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Join the game " />
        </ListItem>
        <ListItem button onClick={onHistory}>
          <ListItemAvatar>
            <Avatar>
              <GridOnOutlinedIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Get a history" />
        </ListItem>
        <ListItem button onClick={onLogout}>
          <ListItemAvatar>
            <Avatar>
              <ExitToAppOutlinedIcon fontSize="small" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
};
export default Sidebar;
