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

const LaboratoriosReferenciaModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListLaboratoriosReferencia }) => {


    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),

        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'crear' : 'modificar'}`, data)

            if (response[0]) {

                setInformation("")
                toast.success(`Se ha ${!id ? 'crear' : 'modificar'} el registro con éxito`, OptionsToast)
                const json = { ...response[0], ...data };
                setInformation(json)
                ListLaboratoriosReferencia()
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
            //clearErrors()

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
                            {opcion === 1 && 'Crear '}LaboratoriosReferencia
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

                
                            <Col lg={12} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Nombre*</p>
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.nombre : ''}
                                        {...register('nombre', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.nombre && <><i className="fas fa-exclamation-circle"></i> {errors.nombre.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={12} md={6} sm={12}>
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
                            <Col lg={4} md={6} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Teléfono*</p>
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        autoComplete="off"
                                        defaultValue={information ? information.telefono : ''}
                                        disabled={opcion === 2}
                                        className="form-control"
                                        {...register('telefono', { required: 'Este campo es requerido.', pattern: { value: /^[0-9]*(\.[0-9])?$/, message: "Sólo se admiten valores numericos" }, min: { value: 0, message: 'No se permiten valores menor a 0' } })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.telefono && <><i className="fas fa-exclamation-circle"></i> {errors.telefono.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
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
                            <Col lg={4} md={6} sm={12}>
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
                            <Col lg={4} md={6} sm={12}>
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

export default LaboratoriosReferenciaModal;
