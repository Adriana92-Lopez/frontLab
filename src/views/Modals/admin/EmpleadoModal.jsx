import React, { useEffect, useState } from "react";

import {
    Button,
    TabPane,
    TabContent,
    NavLink,
    NavItem,
    Nav,
    Form,
    FormGroup,
    Modal,
    Row,
    Col
} from "reactstrap";
import { useForm } from "react-hook-form"
import { PostRoute } from '../../../services/Private'
import Select from 'react-select'
import { OptionsToast } from 'variables';
import { toast } from 'react-toastify'

const EmpleadoModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListCategorias }) => {


    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),

        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'create' : 'update'}`, data)

            if (response[0]) {

                setInformation("")
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { ...response[0], ...data };
                setInformation(json)
                ListCategorias()
                toggleModal(null, 0)
                reset()

            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
            // reset()
        },
        onSubmit = (data) => {
            const json = { id: (information ? information.id : null) }
            const jsonRequest = { ...json, ...data }
            StoreUpdate(jsonRequest, information ? information.id : null)
            clearErrors()

        },
        setData = async () => {
            await setValue('nombre', information.nombre)
            await setValue('codigo', information.codigo)
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
                size="md"
            >
                <Form onSubmit={(opcion !== 2) ? handleSubmit(onSubmit) : () => toggleModal(null, 0)}>

                    <div className="modal-header pb-0">
                        <h3 className="modal-title" id="modalOpenLabel">
                            {opcion === 1 && 'Crear '}Categorías
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
                        <Row className="mt-2">
                            {
                                information &&
                                <Col lg={4} md={4} sm={12}>
                                    <FormGroup>
                                        <p className="mb-1">Código</p>
                                        <input
                                            id="codigo"
                                            name="codigo"
                                            autoComplete="off"
                                            disabled
                                            className="form-control"
                                            defaultValue={information ? information.codigo : ''}
                                            {...register('codigo')}
                                        />
                                    </FormGroup>
                                </Col>
                            }
                            <Col lg={12} md={12} sm={12}>
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
                            <Col lg={12} md={12} sm={12}>
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
                            <Col lg={12} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Apellido Casada*</p>
                                    <input
                                        id="apellido_casada"
                                        name="apellido_casada"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.apellido_casada : ''}
                                        {...register('apellido_casada', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.apellido_casada && <><i className="fas fa-exclamation-circle"></i> {errors.apellido_casada.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
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
                            <Col lg={6} md={12} sm={12}>
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
                            <Col lg={6} md={12} sm={12}>
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
                            <Col lg={6} md={4} sm={12}>
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
                            <Col lg={6} md={4} sm={12}>
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
                            <Col lg={6} md={4} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha de Nacimiento*</p>
                                    <input
                                        id="fecha_nacimiento"
                                        name="fecha_nacimiento"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_nacimiento : ''}
                                        {...register('fecha_nacimiento', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.fecha_nacimiento && <><i className="fas fa-exclamation-circle"></i> {errors.fecha_nacimiento.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={12} md={6} sm={12}>
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
                            <Col lg={6} md={6} sm={12}>
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
                            <Col lg={6} md={6} sm={12}>
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
                            <Col lg={12} md={6} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Observaciones*</p>
                                    <input
                                        id="observaciones"
                                        name="observaciones"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.observaciones : ''}
                                        {...register('observaciones', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.observaciones && <><i className="fas fa-exclamation-circle"></i> {errors.observaciones.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                        </Row>

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
                            opcion === 3 &&
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
