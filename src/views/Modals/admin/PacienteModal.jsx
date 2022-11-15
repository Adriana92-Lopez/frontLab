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

const PacienteModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListPaciente }) => {


    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),

        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'crear' : 'modificar'}`, data)

            if (response[0]) {

                setInformation("")
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { ...response[0], ...data };
                setInformation(json)
                ListPaciente()
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
            console.log(data)
            StoreUpdate(jsonRequest, information ? information.id : null)
            // clearErrors()

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
                size="lg"
            >
                <Form onSubmit={(opcion !== 2) ? handleSubmit(onSubmit) : () => toggleModal(null, 0)}>

                    <div className="modal-header pb-0">
                        <h3 className="modal-title" id="modalOpenLabel">
                            {opcion === 1 && 'Crear '}Paciente
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

                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Nombres*</p>
                                    <input
                                        id="nombres_paciente"
                                        name="nombres_paciente"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.nombres_paciente : ''}
                                        {...register('nombres_paciente', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.nombres_paciente && <><i className="fas fa-exclamation-circle"></i> {errors.nombres_paciente.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Apellidos*</p>
                                    <input
                                        id="apellidos_paciente"
                                        name="apellidos_paciente"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.apellidos_paciente : ''}
                                        {...register('apellidos_paciente', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.apellidos_paciente && <><i className="fas fa-exclamation-circle"></i> {errors.apellidos_paciente.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Edad*</p>
                                    <input
                                        id="edad"
                                        name="edad"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.edad : ''}
                                        {...register('edad', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.edad && <><i className="fas fa-exclamation-circle"></i> {errors.edad.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={12} sm={12}>
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
                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Nit*</p>
                                    <input
                                        id="nit"
                                        name="nit"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.nit : ''}
                                        {...register('nit', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.nit && <><i className="fas fa-exclamation-circle"></i> {errors.nit.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Email*</p>
                                    <input
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        type="email"
                                        defaultValue={information ? information.email : ''}
                                        {...register('email', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.email && <><i className="fas fa-exclamation-circle"></i> {errors.email.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Dirección*</p>
                                    <input
                                        id="direccion"
                                        name="direccion"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.direccion : ''}
                                        {...register('direccion', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.direccion && <><i className="fas fa-exclamation-circle"></i> {errors.direccion.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>

                            <Col lg={4} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Observaciones*</p>
                                    <input
                                        id="observacion"
                                        name="observacion"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.observacion : ''}
                                        {...register('observacion', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.observacion && <><i className="fas fa-exclamation-circle"></i> {errors.observacion.message}</>}
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

export default PacienteModal;
