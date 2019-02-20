import Upload from "./../../components/Upload";
import AdminGate from "./../../components/AdminGate";
import PleaseSignIn from "./../../components/PleaseSignIn";

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