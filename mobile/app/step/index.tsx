import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import { colors } from '../../constants/colors'
import { Header } from '../../components/header'
import { Input } from '../../components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, router } from 'expo-router'
import { useDataStore } from '../../store/data'


const schema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    peso: z.string().min(1, { message: 'Peso é obrigatório' }),
    altura: z.string().min(1, { message: 'Altura é obrigatório' }),
    idade: z.string().min(1, { message: 'Idade é obrigatório' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    const setPageOne = useDataStore(state => state.setPageOne)


    function handleCreate(data: FormData) {
        console.log("Passando os dados")

        setPageOne({
            name: data.name,
            peso: data.peso,
            altura: data.altura,
            idade: data.idade,
        })


        router.push('/create')
    }

    return (
        <View style={styles.container}>
            <Header
                step='Passo 1'
                title='Vamos Começar'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input
                    name='name'
                    control={control}
                    placeholder='Digite seu nome'
                    error={errors.name?.message}
                    keyboardType='default'

                />

                <Text style={styles.label}>Peso:</Text>
                <Input
                    name='peso'
                    control={control}
                    placeholder='Ex: 75'
                    error={errors.peso?.message}
                    keyboardType='numeric'

                />

                <Text style={styles.label}>Altura:</Text>
                <Input
                    name='altura'
                    control={control}
                    placeholder='Ex: 1.80'
                    error={errors.altura?.message}
                    keyboardType='numeric'

                />

                <Text style={styles.label}>Idade:</Text>
                <Input
                    name='idade'
                    control={control}
                    placeholder='Ex: 25'
                    error={errors.idade?.message}
                    keyboardType='numeric'
                />



                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)} >
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,

    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }


})