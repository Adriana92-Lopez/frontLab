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
import { PostRoute } from '../../../services/Private'
import * as Icon from 'react-feather'
import { OptionsToast } from 'variables';
import { toast } from 'react-toastify'

const EmpleadoModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListEmpleado }) => {

    const ReferenciaEmpleadosController = "ReferenciaEmpleados";
    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),

        [active, setActive] = useState("1"),
        [referencias, setReferencias] = useState([]),
        nextTab = (e) => {
            setActive(e)
        },
        ListReferencias = async (json) => {
            const response = await PostRoute(`${ReferenciaEmpleadosController}/mostrar`, json)
            setReferencias((response.length) ? response : [])
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
                name: 'Número de Teléfono',
                column: 'no_telefono',
                selector: row => row.no_telefono,
                sortable: true,
                center: true,
                cell: row => row['no_telefono']
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
            const response = await PostRoute(`${ReferenciaEmpleadosController}/eliminar`, json)
            ListReferencias({ id_empleado: (opcion > 1) ? data.id : data.id_empleado })
            const msg = (response[0] ? response[0].id : null)
            return msg
        },
        updateState = async (item) => {
            let messageToast = 'Referencia eliminada correctamente.';
            const stringMsg = await RequestUpdateState(item);
            if (!stringMsg) {
                toast.warning('No se logró eliminar el registro', OptionsToast)
            } else {
                toast.success(messageToast, OptionsToast)
            }
        },
        StoreRef = async (data, id) => {
            const response = await PostRoute(`${ReferenciaEmpleadosController}/${!id ? 'crear' : 'modificar'}`, data)
            if (response[0]) {
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                ListReferencias({ id_empleado: data.id_empleado })
            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
        },
        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'crear' : 'modificar'}`, data)

            if (response[0]) {
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { id_empleado: response[0].id, ...data };
                setInformation(json)
                ListEmpleado()
                setActive("2")
                // toggleModal(null, 0)
                // reset()
            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
        },
        onSubmit = (data) => {
            if (active === "1" || active === 1) {
                if (!data.apellido_casada) {
                    data = { ...data, apellido_casada: null }
                }
                if (!data.observacion) {
                    data = { ...data, observacion: null }
                }
                const json = { id: (information ? information.id : null), foto: null, ext_cv: null, cv: null, ext_foto: null }
                const jsonRequest = { ...json, ...data }
                StoreUpdate(jsonRequest, information ? information.id : null)
            } else {
                console.log(information)
                const jsonRequest = { id_empleado: (information ? information.id_empleado : null), ...data }
                StoreRef(jsonRequest, null)

            }
            //clearErrors()

        },
        setData = async () => {
            await setValue('nombre', information.nombre)
            await setValue('codigo', information.codigo)
            ListReferencias({ id_empleado: information.id })
        }

    useEffect(
        () => {
            async function fetchMyAPI() {
                if (await opcion > 1 && information) {
                    await setData()
                } else {
                    reset()
                    clearErrors()
                }
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
                <Form onSubmit={(opcion !== 2) ? handleSubmit(onSubmit) : () => toggleModal(null, 0)}>

                    <div className="modal-header pb-0">
                        <h3 className="modal-title" id="modalOpenLabel">
                            {opcion === 1 && 'Crear '}Empleado
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
                                    Datos Personales
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
                                    Referencias
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={active}>
                            <TabPane tabId='1'>
                                <Row className="mt-2">

                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Nombres*</p>
                                            <input
                                                id="nombres"
                                                name="nombres"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.nombres : ''}
                                                {...register('nombres', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.nombres && <><i className="fas fa-exclamation-circle"></i> {errors.nombres.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Apellidos*</p>
                                            <input
                                                id="apellidos"
                                                name="apellidos"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.apellidos : ''}
                                                {...register('apellidos', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.apellidos && <><i className="fas fa-exclamation-circle"></i> {errors.apellidos.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Apellido Casada</p>
                                            <input
                                                id="apellido_casada"
                                                name="apellido_casada"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.apellido_casada : ''}
                                                {...register('apellido_casada')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">DPI*</p>
                                            <input
                                                id="dpi"
                                                name="dpi"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.dpi : ''}
                                                {...register('dpi', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.dpi && <><i className="fas fa-exclamation-circle"></i> {errors.dpi.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Teléfono*</p>
                                            <input
                                                id="no_telefono"
                                                name="no_telefono"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.no_telefono : ''}
                                                {...register('no_telefono', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.no_telefono && <><i className="fas fa-exclamation-circle"></i> {errors.no_telefono.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Dirección*</p>
                                            <input
                                                id="direccion_casa"
                                                name="direccion_casa"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.direccion_casa : ''}
                                                {...register('direccion_casa', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.direccion_casa && <><i className="fas fa-exclamation-circle"></i> {errors.direccion_casa.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Email*</p>
                                            <input
                                                id="email"
                                                name="email"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.email : ''}
                                                {...register('email', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.email && <><i className="fas fa-exclamation-circle"></i> {errors.email.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Genero*</p>
                                            <input
                                                id="genero"
                                                name="genero"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.genero : ''}
                                                {...register('genero', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.genero && <><i className="fas fa-exclamation-circle"></i> {errors.genero.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Fecha de Nacimiento</p>
                                            <input
                                                id="fecha_nacimiento"
                                                name="fecha_nacimiento"
                                                type="date"
                                                autoComplete="off"
                                                defaultValue={information ? information.fecha_nacimiento : ''}
                                                disabled={opcion === 2}
                                                className="form-control"
                                                {...register('fecha_nacimiento')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Número de Cuenta*</p>
                                            <input
                                                id="no_cuenta"
                                                name="no_cuenta"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.no_cuenta : ''}
                                                {...register('no_cuenta', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.no_cuenta && <><i className="fas fa-exclamation-circle"></i> {errors.no_cuenta.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Banco*</p>
                                            <input
                                                id="banco"
                                                name="banco"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.banco : ''}
                                                {...register('banco', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.banco && <><i className="fas fa-exclamation-circle"></i> {errors.banco.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Tipo de Cuenta*</p>
                                            <input
                                                id="tipo_cuenta"
                                                name="tipo_cuenta"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.tipo_cuenta : ''}
                                                {...register('tipo_cuenta', { required: 'Este campo es requerido.' })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.tipo_cuenta && <><i className="fas fa-exclamation-circle"></i> {errors.tipo_cuenta.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={12} md={12} sm={12}>
                                        <FormGroup>
                                            <p className="mb-1">Observaciones</p>
                                            <input
                                                id="observacion"
                                                name="observacion"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.observacion : ''}
                                                {...register('observacion')}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </TabPane>

                            <TabPane tabId='2'>
                                <Row className="mt-2">
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Nombres*</p>
                                            <input
                                                id="nombres_referencias"
                                                name="nombres_referencias"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.nombres_referencias : ''}
                                                {...register('nombres_referencias', { required: information ? 'Este campo es requerido.' : false })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.nombres_referencias && <><i className="fas fa-exclamation-circle"></i> {errors.nombres_referencias.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Apellidos*</p>
                                            <input
                                                id="apellidos_referencias"
                                                name="apellidos_referencias"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.apellidos_referencias : ''}
                                                {...register('apellidos_referencias', { required: information ? 'Este campo es requerido.' : false })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.apellidos_referencias && <><i className="fas fa-exclamation-circle"></i> {errors.apellidos_referencias.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Número de telefono*</p>
                                            <input
                                                id="no_telefono"
                                                name="no_telefono"
                                                type="number"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.no_telefono : ''}
                                                {...register('no_telefono', { required: information ? 'Este campo es requerido.' : false })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.no_telefono && <><i className="fas fa-exclamation-circle"></i> {errors.no_telefono.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <FormGroup>
                                            <p className="mb-1">Dirección*</p>
                                            <input
                                                id="direccion"
                                                name="direccion"
                                                autoComplete="off"
                                                disabled={opcion === 2}
                                                className="form-control"
                                                defaultValue={information ? information.direccion : ''}
                                                {...register('direccion', { required: information ? 'Este campo es requerido.' : false })}
                                            />
                                            <span className="text-danger text-small d-block mb-2">
                                                {!!errors.direccion && <><i className="fas fa-exclamation-circle"></i> {errors.direccion.message}</>}
                                            </span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {referencias.length ?
                                    <Row>
                                        <Col >
                                            <Container fluid>
                                                <DataTable
                                                    // dense
                                                    noHeader
                                                    highlightOnHover
                                                    pagination
                                                    data={referencias}
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
                                    </Row> : null
                                }
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
                        {
                            (active === "1") && opcion === 3 &&
                            <Button color="info" type="submit">Actualizar</Button>
                        }
                        {
                            opcion === 1 &&
                            <Button color="primary" type="submit">Guardar</Button>
                        }
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default EmpleadoModal;
