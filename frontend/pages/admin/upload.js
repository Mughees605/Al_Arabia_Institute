import Upload from "./../../components/AdminComponents/Upload";
import AdminGate from "./../../components/AdminComponents/AdminGate";
import PleaseSignIn from "./../../components/AdminComponents/PleaseSignIn";

const UploadRecordingPage = props => (
    <div>
        <PleaseSignIn>
            <AdminGate>
                <Upload class_id={props.query.class_id || ''} />
            </AdminGate>
        </PleaseSignIn>
    </div>
);

export default UploadRecordingPage;