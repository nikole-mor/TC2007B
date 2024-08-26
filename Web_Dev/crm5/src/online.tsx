import { List, Datagrid, TextField, EditButton, ReferenceField, 
    Edit, SimpleForm, TextInput, ReferenceInput, Create, DateField,
    NumberField, BooleanField } from "react-admin";

export const ListaOnline = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="telephone" label="userId"/>
            <TextField source="email" />
            <DateField source="fechaDonacion" label="Fecha de donación"/>
            <NumberField source="monto" label="Monto"/>
            <TextField source="comprobante" label="Comprobante"/>
            <BooleanField source="recurrente" label="Donación recurrente"/>
            <EditButton />
        </Datagrid>
    </List>
);