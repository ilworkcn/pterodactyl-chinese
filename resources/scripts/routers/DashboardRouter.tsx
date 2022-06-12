import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import { useLocation } from 'react-router';

export default () => {
    const location = useLocation();

    return (
        <>
            <NavigationBar/>
            {location.pathname.startsWith('/account') &&
                <SubNavigation>
                    <div>
                        <NavLink to={'/account'} exact>����</NavLink>
                        <NavLink to={'/account/api'}>API ƾ֤</NavLink>
                        <NavLink to={'/account/ssh'}>SSH ��Կ</NavLink>
                    </div>
                </SubNavigation>
            }
            <TransitionRouter>
                <Switch location={location}>
                    <Route path={'/'} exact>
                        <DashboardContainer/>
                    </Route>
                    <Route path={'/account'} exact>
                        <AccountOverviewContainer/>
                    </Route>
                    <Route path={'/account/api'} exact>
                        <AccountApiContainer/>
                    </Route>
                    <Route path={'/account/ssh'} exact>
                        <AccountSSHContainer/>
                    </Route>
                    <Route path={'*'}>
                        <NotFound/>
                    </Route>
                </Switch>
            </TransitionRouter>
        </>
    );
};
