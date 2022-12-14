import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import AddClient from '../components/admin/client/AddClient';
import ViewClient from '../components/admin/client/ViewClient';
import EditClient from '../components/admin/client/EditClient';

const routes =[
    { path: '/admin', exact: true, name:'Admin'},
    { path: '/admin/dashboard', exact: true, name:'Dashboard', component:Dashboard},
    { path: '/admin/add-client', exact: true, name:'AddClient', component:AddClient},
    { path: '/admin/view-client', exact: true, name:'ViewClient', component:ViewClient},
    { path: '/admin/edit-client/:id', exact: true, name:'EditClient', component:EditClient},
    { path: '/admin/profile', exact: true, name:'Profile', component:Profile},
];

export default routes;