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

const PlanillaModal = ({ modalOpen, nameController, toggleModal, information, setInformation, opcion, ListCategorias }) => {


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
                                <Col lg={12} md={12} sm={12}>
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
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Puesto*</p>
                                    <input
                                        id="puesto"
                                        name="puesto"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.puesto : ''}
                                        {...register('puesto', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.puesto && <><i className="fas fa-exclamation-circle"></i> {errors.puesto.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha Ingreso*</p>
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
                                    <p className="mb-1">Fecha Finalización*</p>
                                    <input
                                        id="fecha_salida"
                                        name="fecha_salida"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_salida : ''}
                                        {...register('fecha_salida', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.fecha_salida && <><i className="fas fa-exclamation-circle"></i> {errors.fecha_salida.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Sueldo*</p>
                                    <input
                                        id="sueldo"
                                        name="sueldo"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.sueldo : ''}
                                        {...register('sueldo', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.sueldo && <><i className="fas fa-exclamation-circle"></i> {errors.sueldo.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">IGSS*</p>
                                    <input
                                        id="igss"
                                        name="igss"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.igss : ''}
                                        {...register('igss', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.igss && <><i className="fas fa-exclamation-circle"></i> {errors.igss.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">IRTRA*</p>
                                    <input
                                        id="irtra"
                                        name="irtra"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.irtra : ''}
                                        {...register('irtra', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.irtra && <><i className="fas fa-exclamation-circle"></i> {errors.irtra.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Bonificaciones*</p>
                                    <input
                                        id="bonificaciones"
                                        name="bonificaciones"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.bonificaciones : ''}
                                        {...register('bonificaciones', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.bonificaciones && <><i className="fas fa-exclamation-circle"></i> {errors.bonificaciones.message}</>}
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

export default PlanillaModal;
