import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { selectedPlaceContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [selectedPlaceCon, setSelectedPlaceCon, destination, setDestinstion, user, setUser] = useContext(selectedPlaceContext);

    return (
      // Private Route Code
        <Route
      {...rest}
      render={({ location }) =>
      user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;