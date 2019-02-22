import CreateClass from '../../components/AdminComponents/CreateClass';
import PleaseSignIn from '../../components/AdminComponents/PleaseSignIn';
import AdminGate from './../../components/AdminComponents/AdminGate';

const CreateClassPage = props => (
    <div>
        <PleaseSignIn>
            <AdminGate>
                <CreateClass />
            </AdminGate>
        </PleaseSignIn>
    </div>
)

export default CreateClassPage;