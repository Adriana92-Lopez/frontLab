import React, { useEffect, Fragment, useState } from "react";

import {
    Button,
    TabPane,
    TabContent,
    NavLink,
    NavItem,
    Nav,
    Form,
    Container,
    Alert,
    FormGroup,
    Modal,
    Row,
    Col
} from "reactstrap";
import DataTable from 'react-data-table-component'
import { useForm } from "react-hook-form"
import { PostRoute, GetRoute } from '../../../services/Private'
import Select from 'react-select'
import * as Icon from 'react-feather'
import { OptionsToast } from 'variables';
import { toast } from 'react-toastify'

const OrdenMedicaModal = ({ modalOpen, active, setActive, nameController, toggleModal, information, setInformation, opcion }) => {

    const OrdenMedicaController = "OrdenMedica";
    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),
        [medico, setMedico] = useState([]),
        [OrdenMedica, setOrdenMedica] = useState([]),
        [prueba, setPrueba] = useState([]),
        [labRef, setLabRef] = useState([]),
        [WarningMedico, setWarningMedico] = useState(false),
        [valueMedico, setValueMedico] = useState(null),
        [WarningPrueba, setWarningPrueba] = useState(false),
        [WarningVIncidencia, setWarningVIncidencia] = useState(false),
        [WarningvTotal, setWarningvTotal] = useState(false),
        [valuePrueba, setValuePrueba] = useState(null),
        [valueLabRef, setValueLabRef] = useState(null),
        [vIncidencia, setVIncidencia] = useState(""),
        [vTotal, setVTotal] = useState(""),
        Medico = async () => {
            const response = await GetRoute(`Medico/catalogo`)
            setMedico((response.length) ? response : [])
        },
        Prueba = async () => {
            const response = await GetRoute(`Prueba/catalogo`)
            setPrueba((response.length) ? response : [])
        },
        LabRef = async () => {
            const response = await GetRoute(`LaboratoriosReferencia/catalogo`)
            setLabRef((response.length) ? response : [])
        },
        nextTab = (e) => {
            setActive(e)
        },
        ListOrdenMedica = async (data) => {
            const response = await PostRoute(`${OrdenMedicaController}/mostrar`, data)
            setOrdenMedica((response.length) ? response : [])
        },
        Columns = [
            {
                name: 'Nombre Completo',
                column: 'nombre_completo',
                selector: row => row.nombre_completo,
                sortable: true,
                center: true,
                cell: row => row['nombre_completo']
            },
            {
                name: 'Dirección',
                column: 'direccion',
                sortable: true,
                selector: row => row.direccion,
                center: true,
                cell: row => row['direccion']
            },
            {
                name: 'Acciones',
                column: 'id',
                sortable: false,
                center: true,
                cell: row => (
                    <Icon.Trash className="text-danger mr-1 me-3 cursor-pointer" size={20} onClick={() => updateState(row)} />

                )
            }
        ],
        ColumnsOM = [
            {
                name: 'Medico',
                column: 'medico',
                selector: row => row.medico,
                sortable: true,
                center: true,
                cell: row => row['medico']
            },
            {
                name: 'Total',
                column: 'total',
                sortable: true,
                selector: row => row.total,
                center: true,
                cell: row => row['total']
            },
            {
                name: 'Acciones',
                column: 'id',
                sortable: false,
                center: true,
                cell: row => (
                    <Icon.Trash className="text-danger mr-1 me-3 cursor-pointer" size={20} onClick={() => updateState(row)} />

                )
            }
        ],
        RequestUpdateState = async (data) => {
            const json = { id: data.id, estado: (data.estado === 0 ? 1 : 0) }
            const response = await PostRoute(`${OrdenMedicaController}/eliminar`, json)
            ListOrdenMedica(information.id)
            const msg = (response[0] ? response[0].id : null)
            return msg
        },
        updateState = async (item) => {
            let messageToast = 'Orden eliminada correctamente.';
            const stringMsg = await RequestUpdateState(item);
            if (!stringMsg) {
                toast.warning('No se logró eliminar el registro', OptionsToast)
            } else {
                toast.success(messageToast, OptionsToast)
            }
        },
        StoreRef = async (data, id) => {
            const response = await PostRoute(`${OrdenMedicaController}/${!id ? 'crear' : 'modificar'}`, data)
            if (response[0]) {
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)

                ListOrdenMedica({ id_paciente: information.id })

            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
        },
        onChangeMedico = (data) => {
            if (data) {
                setWarningMedico(false)
            } else {
                setWarningMedico(true)
            }
            setValueMedico(data)
        },
        onChangePrueba = (data) => {
            if (data) {
                setWarningPrueba(false)
            } else {
                setWarningPrueba(true)
            }
            setValuePrueba(data)
        },
        onChangeLabRef = (data) => {

            setValueLabRef(data)
        },
        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${OrdenMedicaController}/${!id ? 'crear' : 'modificar'}`, data)

            if (response[0]) {
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { id_orden_medica: response[0].id, ...data };
                setInformation(json)
                ListOrdenMedica({ id_paciente: information.id })

                // toggleModal(null, 0)
                // reset()
            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
        },
        TotalSet = (data) => {
            if (data) {
                setWarningvTotal(false)
            } else {
                setWarningvTotal(true)
            }
            setVTotal(data)
        },
        IncidenciaSet = (data) => {
            if (data) {
                setWarningVIncidencia(false)
            } else {
                setWarningVIncidencia(true)
            }
            setVIncidencia(data)
        },
        onSubmit = () => {
            if (vIncidencia) {
                setWarningVIncidencia(false)
            } else {
                setWarningVIncidencia(true)
            }
            if (vTotal) {
                setWarningvTotal(false)
            } else {
                setWarningvTotal(true)
            }
            if (valueMedico) {
                setWarningMedico(false)
            } else {
                setWarningMedico(true)
            }

            if (vIncidencia && vTotal && valueMedico) {

                const json = { id_paciente: (information ? information.id : null), id_medico: valueMedico.value, incidencias: vIncidencia, total: vTotal }
                StoreUpdate(json, information ? information.id_orden_medica : null)
            }


        },
        setData = async () => {
            await setValue('nombre', information.nombre)
            await setValue('codigo', information.codigo)
            // ListOrdenMedica({ id_OrdenMedica: information.id })
        }

    useEffect(
        () => {
            async function fetchMyAPI() {
                if (await opcion > 1 && information) {
                    await setData()
                    ListOrdenMedica({ id_paciente: information.id })
                } else {
                    reset()
                    clearErrors()
                }
                Medico()
                Prueba()
                LabRef()

            }
            fetchMyAPI()

        }, [opcion, information]
    )
    return (
        <>
            <Modal
                isOpen={modalOpen}
                toggle={function noRefCheck(e) { toggleModal(null, 0); clearErrors(); }}
                className="modal-dialog-centered"
                size="lg"
            >
                <div className="modal-header pb-0">
                    <h3 className="modal-title" id="modalOpenLabel">
                        {opcion === 1 && 'Crear '}Orden Médica
                    </h3>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={function noRefCheck(e) { toggleModal(null, 0); reset() }}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                active={active === "1"}
                                className=""
                                style={{ cursor: 'pointer' }}
                                onClick={() => nextTab("1")}
                            >
                                Orden Médica
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={active === "2"}
                                style={{ cursor: 'pointer' }}
                                className=""
                                disabled={(opcion === 1 && !information)}
                                onClick={() => nextTab("2")}
                            >
                                Historial
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={active}>
                        <TabPane tabId='1'>

                            <Row className="mt-2">

                                <Col lg={6} md={6} sm={12}>
                                    <FormGroup>
                                        <p className="mb-1">Médico*</p>
                                        <Select
                                            name="medico"
                                            id="medico"
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Elija una opcion"
                                            noOptionsMessage={() => "Sin resultados"}
                                            isClearable
                                            isDisabled={opcion === 2}
                                            options={medico}
                                            value={valueMedico}
                                            onChange={onChangeMedico}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {!!WarningMedico && <><i className="fas fa-exclamation-circle"></i> Este campo es requerido</>}
                                        </span>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} md={6} sm={6}>
                                    <FormGroup>
                                        <p className="mb-1">Total*</p>
                                        <input
                                            id="total"
                                            name="total"
                                            autoComplete="off"
                                            type="number"
                                            disabled={opcion === 2}
                                            className="form-control"
                                            defaultValue={vTotal}
                                            onChange={(d) => TotalSet(d.target.value)}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {WarningvTotal && <><i className="fas fa-exclamation-circle"></i> Este campo es requerido.</>}
                                        </span>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} md={6} sm={6}>
                                    <FormGroup>
                                        <p className="mb-1">Incidencias*</p>
                                        <input
                                            id="incidencias"
                                            name="incidencias"
                                            autoComplete="off"
                                            disabled={opcion === 2}
                                            className="form-control"
                                            defaultValue={vIncidencia}
                                            onChange={(d) => IncidenciaSet(d.target.value)}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {WarningVIncidencia && <><i className="fas fa-exclamation-circle"></i>Este campo es requerido.</>}
                                        </span>
                                    </FormGroup>
                                </Col>
                                <Col>

                                    <Button color="success" type="button" onClick={() => onSubmit()} className="mt-4">Guardar</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={12} md={12} sm={12}>
                                    <p className="mb-2 text-black">Detalle de pruebas</p></Col>

                                <Col lg={8} md={8} sm={6}> </Col>
                                <Col lg={4} md={4} sm={6}>
                                    <FormGroup>
                                        <p className="mb-1">Precio*</p>
                                        <input
                                            id="precio"
                                            name="precio"
                                            type="number"
                                            autoComplete="off"
                                            disabled={opcion === 2}
                                            className="form-control"
                                            defaultValue={information ? information.precio : ''}
                                            {...register('precio', { required: !information ? 'Este campo es requerido.' : null })}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {!!errors.precio && <><i className="fas fa-exclamation-circle"></i> {errors.precio.message}</>}
                                        </span>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                    <FormGroup>
                                        <p className="mb-1">Prueba*</p>
                                        <Select
                                            name="prueba"
                                            id="prueba"
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Elija una opcion"
                                            noOptionsMessage={() => "Sin resultados"}
                                            isClearable
                                            isDisabled={opcion === 2}
                                            options={prueba}
                                            value={valuePrueba}
                                            onChange={onChangePrueba}
                                        />
                                        <span className="text-danger text-small d-block mb-2">
                                            {!!WarningPrueba && <><i className="fas fa-exclamation-circle"></i> Este campo es requerido</>}
                                        </span>
                                    </FormGroup>
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                    <FormGroup>
                                        <p className="mb-1">Laboratorio Referidos</p>
                                        <Select
                                            name="id_laboratorios_referencia"
                                            id="id_laboratorios_referencia"
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Elija una opcion"
                                            noOptionsMessage={() => "Sin resultados"}
                                            isClearable
                                            isDisabled={opcion === 2}
                                            options={labRef}
                                            value={valueLabRef}
                                            onChange={onChangeLabRef}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <FormGroup>
                                        <p className="mb-1">Resultados</p>
                                        <input
                                            id="resultado"
                                            name="resultado"
                                            autoComplete="off"
                                            disabled={opcion === 2}
                                            className="form-control"
                                            defaultValue={information ? information.resultado : ''}
                                            {...register('resultado')}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col >
                                    <Container fluid>
                                        <DataTable
                                            // dense
                                            noHeader
                                            highlightOnHover
                                            pagination
                                            data={OrdenMedica}
                                            columns={ColumnsOM}
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
                                </Col>
                            </Row>

                        </TabPane>

                        <TabPane tabId='2'>

                            <Row>
                                <Col >
                                    <Container fluid>
                                        <DataTable
                                            // dense
                                            noHeader
                                            highlightOnHover
                                            pagination
                                            data={OrdenMedica}
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
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                <div className="modal-footer">
                    <Button
                        color="danger"
                        data-dismiss="modal"
                        type="button"
                        onClick={function noRefCheck(e) { toggleModal(null, 0); clearErrors(); reset(); }}
                    >
                        Salir
                    </Button>

                </div>

            </Modal>
        </>
    );
}

export default OrdenMedicaModal;
