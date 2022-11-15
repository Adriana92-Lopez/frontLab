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

const InventarioModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListInventario }) => {


    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),

        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'create' : 'update'}`, data)

            if (response[0]) {

                setInformation("")
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { ...response[0], ...data };
                setInformation(json)
                ListInventario()
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
            await setValue('nit', information.nit)
            await setValue('direccion', information.direccion)
            await setValue('descripcion', information.descripcion)
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
                            {opcion === 1 && 'Crear '}Inventario
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
                                    <p className="mb-1">Costo*</p>
                                    <input
                                        id="costo"
                                        name="costo"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.costo : ''}
                                        {...register('costo', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.costo && <><i className="fas fa-exclamation-circle"></i> {errors.costo.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Descripción*</p>
                                    <input
                                        id="descripcion"
                                        name="descripcion"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.descripcion : ''}
                                        {...register('descripcion', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.descripcion && <><i className="fas fa-exclamation-circle"></i> {errors.descripcion.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha de Ingreso*</p>
                                    <input
                                        id="fecha_ingreso"
                                        name="fecha_ingreso"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_ingreso : ''}
                                        {...register('fecha_ingreso', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.fecha_ingreso && <><i className="fas fa-exclamation-circle"></i> {errors.fecha_ingreso.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha de Vencimiento*</p>
                                    <input
                                        id="fecha_vencimiento"
                                        name="fecha_vencimiento"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_vencimiento : ''}
                                        {...register('fecha_vencimiento', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.fecha_vencimiento && <><i className="fas fa-exclamation-circle"></i> {errors.fecha_vencimiento.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha de Uso*</p>
                                    <input
                                        id="fecha_uso"
                                        name="fecha_uso"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_uso : ''}
                                        {...register('fecha_uso', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.fecha_uso && <><i className="fas fa-exclamation-circle"></i> {errors.fecha_uso.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Cantidad*</p>
                                    <input
                                        id="cantidad"
                                        name="cantidad"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.cantidad : ''}
                                        {...register('cantidad', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.cantidad && <><i className="fas fa-exclamation-circle"></i> {errors.cantidad.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Total*</p>
                                    <input
                                        id="tota"
                                        name="tota"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.tota : ''}
                                        {...register('tota', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.tota && <><i className="fas fa-exclamation-circle"></i> {errors.tota.message}</>}
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

export default InventarioModal;
