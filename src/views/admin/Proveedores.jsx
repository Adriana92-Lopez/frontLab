import { useState, Fragment, useEffect } from 'react'
import {
    Card,
    CardHeader,
    Container,
    Alert,
    Row,
    Col
} from "reactstrap";
import DataTable from 'react-data-table-component'
import * as Icon from 'react-feather'
import { GetRoute, PostRoute } from '../../services/Private'
import { OptionsToast } from 'variables';
import { toast } from 'react-toastify'
import Header from "components/Headers/Header.js";
import ProveedoresModal from "../Modals/admin/ProveedoresModal"

const Proveedores = () => {
    const nameController = "Proveedores"
    const [modalOpen, setModalOpen] = useState(false);
    const [opcion, setOpcion] = useState(0);
    const [contentInfor, setContentInfor] = useState(null);
    const [listProveedores, setListProveedores] = useState([]);

    const ListProveedores = async () => {
        const response = await GetRoute(`${nameController}/listado`)
        setListProveedores((response.length) ? response : [])
    },
        RequestUpdateState = async (data) => {
            const json = { id: data.id, estado: (data.estado === 0 ? 1 : 0) }
            const response = await PostRoute(`${nameController}/eliminar`, json)
            ListProveedores()
            const msg = (response[0] ? response[0].id : null)
            return msg
        },
        RequestOneData = async (id) => {
            const response = await PostRoute(`${nameController}/getOne`, { id })
            const resultado = (response[0] ? response[0] : null)
            return resultado;
        }

    const toggleModal = (value, option) => {

        setContentInfor(null)
        if (option > 1) {
            setContentInfor(value)
        } else {
            setContentInfor(null)
        }
        setModalOpen(!modalOpen);
        setOpcion(option)
    }

    const updateState = async (item) => {
        let messageToast = 'Proveedores ' + (item.estado === 1 ? 'activado' : 'desactivado') + ' correctamente.';
        const stringMsg = await RequestUpdateState(item);
        if (!stringMsg) {
            toast.warning('Ha fallado el cambio de estado.', OptionsToast)
        } else {
            toast.success(messageToast, OptionsToast)
        }
    },
        Columns = [
            {
                name: 'Nombre',
                column: 'nombre',
                sortable: true,
                selector: row => row.nombre,
                center: true,
                cell: row => row['nombre']
            },
            {
                name: 'Correo',
                column: 'email',
                sortable: false,
                center: true,
                cell: row => row['email']
            },
            {
                name: 'Estado',
                column: 'estado',
                selector: row => row.estado,
                sortable: true,
                center: true,
                width: '200px',
                cell: row => <Alert color={row.estado === 1 ? 'success' : 'danger'} className="w-100 text-center m-auto alert-xs font-weight-bolder" style={{ padding: '5px' }}>
                    {(row.estado === 0) && 'Inactivo'}
                    {(row.estado === 1) && 'Activo'}
                </Alert>
            },
            {
                name: 'Acciones',
                column: 'id',
                sortable: false,
                center: true,
                cell: row => (
                    <Fragment>
                        {
                            row.estado === 1 &&
                            <>
                                <Icon.Eye size={20} className="text-info mr-2 me-3 cursor-pointer" onClick={() => toggleModal(row, 2)} />
                                {/* <Icon.Edit size={20} className="text-primary mr-2 me-3 cursor-pointer" onClick={() => toggleModal(row, 3)} /> */}
                            </>
                        }
                        {row.estado === 1 ? <Icon.Trash className="text-danger mr-1 me-3 cursor-pointer" size={20} onClick={() => updateState(row)} /> : <Icon.Check className="text-success mr-1 me-3 cursor-pointer" size={20} onClick={() => updateState(row)} />}
                    </Fragment>
                )
            }
        ]

    useEffect(() => {
        ListProveedores()
    }, [])

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>

                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Administraci??n de Proveedores<Icon.PlusCircle onClick={() => toggleModal(null, 1)} className="ml-1 cursor-pointer text-green" size={25} style={{ cursor: 'pointer' }} /></h3>

                            </CardHeader>
                            <Container fluid>
                                <DataTable
                                    // dense
                                    noHeader
                                    highlightOnHover
                                    pagination
                                    data={listProveedores}
                                    columns={Columns}
                                    className='table-responsive react-dataTable'
                                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                    paginationComponentOptions={
                                        {
                                            rowsPerPageText: '',
                                            rangeSeparatorText: ''
                                        }
                                    }
                                    noDataComponent='Sin Registros'
                                />

                            </Container>

                        </Card>
                    </div>
                </Row>

            </Container>

            <ProveedoresModal modalOpen={modalOpen} nameController={nameController} ListProveedores={ListProveedores} toggleModal={toggleModal} opcion={opcion} information={contentInfor} setInformation={setContentInfor} />
        </>
    );
};

export default Proveedores;
