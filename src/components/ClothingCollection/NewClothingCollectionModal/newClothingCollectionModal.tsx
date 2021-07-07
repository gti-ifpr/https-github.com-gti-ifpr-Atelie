import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { useState, FormEvent } from "react";

import styles from "./styles.module.scss";
import React from "react";

import { useClothingCollections } from "../../../hooks/useClothingCollections";

enum CompromissoType {
    AJUSTE = "AJUSTE",
    MEDIDA = "MEDIDA",
    ORCAMENTO = "ORCAMENTO",
}
enum CompromissoStatus {
    CONFIRMADO = "CONFIRMADO",
    CANCELADO = "CANCELADO",
}

type Client = {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    endereco: {
        endereco: string;
        cidade: string;
        cep: string;
    };
};

type NewScheduleModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
};


export function NewClothingCollectionModal({
    isOpen,
    onRequestClose,
}: NewScheduleModalProps) {

    const [nome, setNome] = useState("");

    const { createClothingCollection } = useClothingCollections()
    async function handleCreateNewSchedule(event: FormEvent) {
        event.preventDefault();

        await createClothingCollection({
            nome: nome
        })

        onRequestClose();

        setNome('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <FiX
                color="#737380"
                size="2rem"
                className="react-modal-close"
                onClick={() => onRequestClose()}
            />
            <div className={styles.modal}>
                <h1>Cadastrar Nova Coleção</h1>

                <form autoComplete="off" onSubmit={handleCreateNewSchedule}>
                    <span>Horário Término:</span>
                    <input
                        required
                        placeholder="Nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                    <button type="submit">Cadastrar Coleção</button>

                </form>
            </div>
        </Modal>
    );
}
