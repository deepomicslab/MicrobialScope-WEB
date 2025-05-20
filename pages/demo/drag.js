import { memo, useCallback, useState } from "react"
import { useDrag, useDrop } from "react-dnd"
import { produce } from "immer"

const containerStyle = {
    width: 400,
}
const ITEMS = [
    {
        id: 1,
        text: 'Write a cool JS library',
    },
    {
        id: 2,
        text: 'Make it generic enough',
    },
    {
        id: 3,
        text: 'Write README',
    },
    {
        id: 4,
        text: 'Create some examples',
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
    },
    {
        id: 6,
        text: '???',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
]

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}
const Card = memo(function Card({ id, text, moveCard, findCard }) {
    const originalIndex = findCard(id).index
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'card',
            item: { id, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveCard(droppedId, originalIndex)
                }
            },
        }),
        [id, originalIndex, moveCard],
    )
    const [, drop] = useDrop(
        () => ({
            accept: 'card',
            hover({ id: draggedId }) {
                if (draggedId !== id) {
                    const { index: overIndex } = findCard(id)
                    moveCard(draggedId, overIndex)
                }
            },
        }),
        [findCard, moveCard],
    )
    const opacity = isDragging ? 0 : 1
    return (
        <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {text}
        </div>
    )
})

const DragDemo = ({}) => {
    const [cards, setCards] = useState(ITEMS)
    const findCard = useCallback(
        (id) => {
            const card = cards.filter((c) => `${c.id}` === id)[0]
            return {
                card,
                index: cards.indexOf(card),
            }
        },
        [cards],
    )
    const moveCard = useCallback(
        (id, atIndex) => {
            const { card, index } = findCard(id);

            setCards(
                produce(cards, (draft) => {
                    // 从原位置移除卡片
                    draft.splice(index, 1);
                    // 在新位置插入卡片
                    draft.splice(atIndex, 0, card);
                })
            );
        },
        [findCard, cards, setCards]
    );
    const [, drop] = useDrop(() => ({ accept: 'card' }))
    return (
        <div ref={drop} style={containerStyle}>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={`${card.id}`}
                    text={card.text}
                    moveCard={moveCard}
                    findCard={findCard}
                />
            ))}
        </div>
    )
}

export default DragDemo
