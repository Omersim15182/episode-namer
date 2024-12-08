import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent() {
  return (
    <Box className={style["demo-page-container"]}>
      <Typography></Typography>
      <SearchBar></SearchBar>
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function Home(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter("/movies/lord-of-the-rings");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={[
        {
          segment: "movies",
          title: "Movies search history",
          icon: <FolderIcon />,
          children: [
            {
              segment: "lord-of-the-rings",
              title: "Lord of the Rings",
              icon: <DescriptionIcon />,
            },
            {
              segment: "harry-potter",
              title: "Harry Potter",
              icon: <DescriptionIcon />,
            },
          ],
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent />
      </DashboardLayout>
    </AppProvider>
  );
}
