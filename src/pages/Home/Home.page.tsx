import { FC, ReactElement, useEffect } from "react";
import { Link } from "react-router";



export const Home: FC = (): ReactElement => {

    return <div>home is here
        <Link to="/dashboard/users"> users page</Link>
    </div>
}