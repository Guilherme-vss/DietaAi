import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { colors } from '../../constants/colors'
import { Header } from '@/components/header'
import { Select } from '../../components/input/select'
import { useDataStore } from '../../store/data'
import { router } from 'expo-router'

const schema = z.object({
  sexo: z.string().min(1, { message: 'O Sexo é obrigatório' }),
  objetivo: z.string().min(1, { message: 'O objetivo é obrigatório' }),
  nivel: z.string().min(1, { message: 'Selecione o nivel' }),
})

type FormData = z.infer<typeof schema>

export default function Create() {

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]
  const objectiveOptions = [
    { label: 'Emagrecimento', value: 'emagrecimento' },
    { label: 'Hipertrofia', value: 'hipertrofia' },
    { label: 'Hipertrofia + Definição', value: 'hipertrofia e Definição' },
    { label: 'Definição', value: 'Definição' },
  ]

  const nivelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)' },
    { label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)' },
    { label: 'Altamente ativo (exercícios 5 a 7 dias por semana)', value: 'Altamente ativo (exercícios 5 a 7 dias por semana)' }
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      sexo: data.sexo,
      objetivo: data.objetivo,
      nivel: data.nivel,
    })

     router.push('/nutrition')

  }

  const setPageTwo = useDataStore(state => state.setPageTwo)

  return (
    <View style={styles.container}>
      <Header
        step='Passo 2'
        title='Finalizando Dieta'
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          name='sexo'
          control={control}
          placeholder='Selecione o sexo'
          error={errors.sexo?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione seu Objetivo:</Text>
        <Select
          name='objetivo'
          control={control}
          placeholder='Selecione seu Objetivo:'
          error={errors.objetivo?.message}
          options={objectiveOptions}
        />

        <Text style={styles.label}>Selecione o nivel de Atividade fisica:</Text>
        <Select
          name='nivel'
          control={control}
          placeholder='Selecione o nivel de Atividade fisica:'
          error={errors.nivel?.message}
          options={nivelOptions}
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)} >
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>

      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,

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