import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./services/store/actions/user";
import { loadSeller } from "./services/store/actions/seller";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const dispatch = useDispatch();

  const {
    user,
    isLoading: isUserLoading,
    isUserAuthenticated,
  } = useSelector((state) => state.user);
  const { isLoading: isSellerLoading, isSellerAuthenticated, seller } =
    useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, [dispatch]);

  if (isUserLoading || isSellerLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRoutes
        user={user}
        seller={seller}
        isUserAuthenticated={isUserAuthenticated}
        isSellerAuthenticated={isSellerAuthenticated}
      />
    </BrowserRouter>
  );
}

export default App;
