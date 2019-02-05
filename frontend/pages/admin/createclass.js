import CreateClass from '../../components/CreateClass';
import PleaseSignIn from '../../components/PleaseSignIn';
import AdminGate from './../../components/AdminGate';

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