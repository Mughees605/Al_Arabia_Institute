import React from 'react';
import Link from 'next/link';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

export default class Class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: [{ name: "First", Class: "Al Arabia", download: 'link' }, { name: "Third", Class: "Al Arabia", download: 'link' }, { name: "Third", Class: "Al Arabia", download: 'link' }]
        }
    }
    render() {
        return (

            <div>
                {/* <Error error={error} /> */}
                <div>
                    {/* added check which is not in tutorials code */}
                    <>
                        <div style={{ display: "flex" }}>
                            <h2 >Class {this.props.class_id} Recordings</h2>
                            <div style={{ marginLeft: "auto", order: 2, marginTop: "25px" }}>
                                <Link
                                    href={{
                                        pathname: '/admin/upload',
                                        query: { class_id: this.props.class_id },
                                    }}
                                >
                                    <SickButton
                                        type="button"
                                    >
                                        Upload
                                    </SickButton>
                                </Link>
                            </div>
                        </div>

                        <Table>
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.body.map((data, i) => (
                                <tr key={i}>
                                    <td>{i++}</td>
                                    <td>{data.name}</td>
                                    <td>{data.Class}</td>
                                    <td>{data.download}</td>
                                </tr>
                            ))}</tbody>
                        </Table>
                    </>

                </div>
            </div>

        )
    }
}