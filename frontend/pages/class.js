import Class from "./../components/Class";


const ClassPage = props => (
    <div>
        <Class class_id={props.query.class_id || ''} />
    </div>
);

export default ClassPage;