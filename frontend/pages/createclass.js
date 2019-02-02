import CreateClass from './../components/CreateClass';
import PleaseSignIn from './../components/PleaseSignIn';

const CreateClassPage = props => (
    <div>
        <PleaseSignIn>
            <CreateClass />
        </PleaseSignIn>
    </div>
)

export default CreateClassPage;