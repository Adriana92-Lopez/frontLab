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

const PruebaModal = ({ modalOpen, nameController, catalogoExamen, toggleModal, information, setInformation, opcion, VerificarPrueba }) => {


    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset, setValue } = useForm(),
        [valuePaqueteP, setValuePaqueteP] = useState(null),
        [WarningPaqueteP, setWarningPaqueteP] = useState(false),
        [WarningExamen, setWarningExamen] = useState(false),
        [examen, setExamen] = useState(null),
        onChangePaquetePromocional = (data) => {
            if (data) {
                setWarningPaqueteP(false)
            } else {
                setWarningPaqueteP(true)
            }
            setValuePaqueteP(data)
        },
        onChangeExamen = (data) => {
            if (data) {
                setWarningExamen(false)
            } else {
                setWarningExamen(true)
            }
            setExamen(data)
        },

        StoreUpdate = async (data, id) => {
            let response = []
            response = await PostRoute(`${nameController}/${!id ? 'crear' : 'modificar'}`, data)

            if (response[0]) {

                setInformation("")
                toast.success(`Se ha ${!id ? 'creado' : 'modificado'} el registro con éxito`, OptionsToast)
                const json = { ...response[0], ...data };
                setInformation(json)
                VerificarPrueba()
                toggleModal(null, 0)
                reset()

            } else {
                toast.warning("No se logró realizar el registro.", OptionsToast)
            }
            // reset()
        },
        onSubmit = (data) => {
            data = { ...data, id_examenes: examen.value, paquete_promocional: valuePaqueteP.value }
            const json = { id: (information ? information.id : null) }
            const jsonRequest = { ...json, ...data }
            StoreUpdate(jsonRequest, information ? information.id : null)
            //clearErrors()

        },
        setData = async () => {
            await setValue('nombre', information.nombre)
            await setValue('descripcion', information.descripcion)
            await setValue('precio', information.precio)
            const tiempo = new Date(information.tiempo_procesamiento)

            const resultTiempo = tiempo.getHours() + ":" + tiempo.getMinutes()
            await setValue('tiempo_procesamiento', resultTiempo)
            await setValue('precio_oferta', information.precio_oferta)
            await setValue('fecha_inicio_oferta', information.fecha_inicio_oferta)
            await setValue('fecha_fin_oferta', information.fecha_fin_oferta)

            await setExamen({ value: information.value, label: information.label })
            await setValuePaqueteP({ value: information.paquete_promocional, label: (information.paquete_promocional === "0") ? 'No' : 'Sí' })
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
                            {opcion === 1 && 'Crear '}Prueba
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
                                    <p className="mb-1">Tipo de Prueba*</p>
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
                            <Col lg={12} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Examen*</p>
                                    <Select
                                        name="examen"
                                        id="examen"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Elija una opcion"
                                        noOptionsMessage={() => "Sin resultados"}
                                        isClearable
                                        isDisabled={opcion === 2}
                                        options={catalogoExamen}
                                        value={examen}
                                        onChange={onChangeExamen}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!WarningExamen && <><i className="fas fa-exclamation-circle"></i> Este campo es requerido</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Precio*</p>
                                    <input
                                        id="precio"
                                        name="precio"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.precio : ''}
                                        {...register('precio', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.precio && <><i className="fas fa-exclamation-circle"></i> {errors.precio.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Tiempo de Procesamiento*</p>
                                    <input
                                        id="tiempo_procesamiento"
                                        type="time"
                                        name="tiempo_procesamiento"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.tiempo_procesamiento : ''}
                                        {...register('tiempo_procesamiento', { required: 'Este campo es requerido.' })}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!errors.tiempo_procesamiento && <><i className="fas fa-exclamation-circle"></i> {errors.tiempo_procesamiento.message}</>}
                                    </span>
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Precio con Oferta</p>
                                    <input
                                        id="precio_oferta"
                                        name="precio_oferta"
                                        autoComplete="off"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.precio_oferta : ''}
                                        {...register('precio_oferta')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha inicio de oferta</p>
                                    <input
                                        id="fecha_inicio_oferta"
                                        name="fecha_inicio_oferta"
                                        autoComplete="off"
                                        type="date"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_inicio_oferta : ''}
                                        {...register('fecha_inicio_oferta')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Fecha fin de oferta</p>
                                    <input
                                        id="fecha_fin_oferta"
                                        name="fecha_fin_oferta"
                                        autoComplete="off"
                                        type="date"
                                        disabled={opcion === 2}
                                        className="form-control"
                                        defaultValue={information ? information.fecha_fin_oferta : ''}
                                        {...register('fecha_fin_oferta')}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6} md={12} sm={12}>
                                <FormGroup>
                                    <p className="mb-1">Paquete Promocional*</p>
                                    <Select
                                        name="paquete_promocional"
                                        id="paquete_promocional"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        placeholder="Elija una opcion"
                                        noOptionsMessage={() => "Sin resultados"}
                                        isClearable
                                        isDisabled={opcion === 2}
                                        options={[{ value: "1", label: "Sí" }, { value: "0", label: "No" }]}
                                        value={valuePaqueteP}
                                        onChange={onChangePaquetePromocional}
                                    />
                                    <span className="text-danger text-small d-block mb-2">
                                        {!!WarningPaqueteP && <><i className="fas fa-exclamation-circle"></i> Este campo es requerido</>}
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

export default PruebaModal;
