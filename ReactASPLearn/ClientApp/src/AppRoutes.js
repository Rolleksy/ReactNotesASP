import { Home } from "./components/Home";
import { CreateNote } from "./components/CreateNote";
import { ListNotes } from "./components/ListNotes";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
      path: '/createnote',
      element: <CreateNote />
    }
    ,
    {
        path: '/listnotes',
        element: <ListNotes />
    }
];

export default AppRoutes;
