class Pokemon{
    constructor({
        id,
        name,
        type=[],
        helds_items=[],
        ability=[],
        sprite,
        hp,
        attack,
        defense,
        special_attack,
        special_defense,
        speed,

    }) {
        this.id=id;
        this.name=name;
        this. type=type;
        this.helds_items=helds_items;
        this.ability=ability;
        this.sprite=sprite;
        this.hp=hp;
        this.attack=attack;
        this.defense=defense;
        this.special_attack=special_attack;
        this.special_defense=special_defense;
        this.speed=speed;

    }

    

} 

export default Pokemon;