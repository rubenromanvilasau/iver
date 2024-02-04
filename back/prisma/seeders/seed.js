const { prisma } = requier('../../src/db');

async function main() {
    const categories = [
        {
        name: 'Electronics',
        description: 'Electronic devices'
        },
        {
        name: 'Books',
        description: 'Books'
        },
        {
        name: 'Clothes',
        description: 'Clothes'
        }
    ];
    
    for (const category of categories) {
        await prisma.category.create({ data: category });
    }

    console.log('Categories seeded');
    console.log('---------------------------------');    

    
}