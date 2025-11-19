"use client";

import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import SimpleDialog from "./simpleDialog";
import DataGrid from "./DataGrid";

export default function About() {
  // 获取数据，给组件直接用
  const about = "material-ui";

  const [age, setAge] = useState("");
  const [value, setValue] = useState<number | null>(2);
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [alignment, setAlignment] = useState("web");

  const handleChange2 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">{about}</h1>
      <DeleteIcon />

      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>

      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
      </FormGroup>

      <Box sx={{ minWidth: 120, maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: 400 }}>
        <Slider defaultValue={30} valueLabelDisplay="auto" />
      </Box>

      <Switch defaultChecked />
      <Box sx={{ width: 400 }}>
        <TextField label="name" variant="outlined" required />
        <TextField label="Standard" variant="standard" />
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
      </Box>
      <Box sx={{ width: 400 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange2}
          aria-label="Platform"
        >
          <ToggleButton value="web">Web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">iOS</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/images/80715739-37C9-4452-9268-B596BCD7ABDD.png"
        />
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/images/assets_task_01jv4mxw0hf97s477g8494kz12_1747134197_img_1.webp"
        />
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/images/assets_task_01jv4mxw0hf97s477g8494kz12_1747134197_img_2.webp"
        />
        <Avatar
          sx={{ width: 100, height: 100 }}
          src="/images/assets_task_01jv4mxw0hf97s477g8494kz12_1747134197_img_3.webp"
        />
      </Stack>
      <div className="m-4">
        <Badge badgeContent={14} color="secondary">
          <MailIcon color="action" />
        </Badge>
        <Badge badgeContent={4} color="success">
          <MailIcon color="action" />
        </Badge>
        <Badge color="secondary" variant="dot">
          <MailIcon />
        </Badge>
      </div>
      <div>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <div className="w-164">
          <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
            Here is a gentle confirmation that your action was successful.
          </Alert>
          <Alert severity="success" variant="filled">
            This is a success Alert.
          </Alert>
        </div>
        <div className="my-5">
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Open simple dialog
          </Button>
          <SimpleDialog open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
      <DataGrid />
    </div>
  );
}
