import { Check, GameController } from 'phosphor-react'
import { Input } from './input'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { useEffect, useState } from 'react'

interface Game {
    id: string,
    title: string
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])

    useEffect(() => {
        fetch('http://localhost:3333/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
            })
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25" >
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                <form className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select
                            defaultValue=""
                            id="game"
                            className="appearance-none bg-zinc-900 py-3 px-4 rounded text-small placeholder:text-zinc-500"
                        >
                            <option disabled value="">Selecione o game que deseja jogar</option>

                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id="name" placeholder="Como te chamam dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input min="0" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input placeholder="Usuario#0000" id="discord" />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <div>
                                <ToggleGroup.Root
                                    onValueChange={setWeekDays}
                                    value={weekDays}
                                    className="grid grid-cols-4 gap-2"
                                    type="multiple">

                                    <ToggleGroup.Item
                                        value="0"
                                        title="Domingo"
                                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        D
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="1"
                                        title="Segunda"
                                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="2"
                                        title="Terça"
                                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        T
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="3"
                                        title="Quarta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="4"
                                        title="Quinta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        Q
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="5"
                                        title="Sexta"
                                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroup.Item>

                                    <ToggleGroup.Item
                                        value="6"
                                        title="Sábado"
                                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-600' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hoursStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-1">
                                <Input type="time" placeholder="De" id="hourStart" />
                                <Input type="time" placeholder="Até" id="hourEnd" />
                            </div>
                        </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root className="w-6 h-6 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400 m-auto" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">

                        <Dialog.Close
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                            type="button"
                        >Cancelar</Dialog.Close>

                        <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                            <GameController size={24}></GameController>
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}