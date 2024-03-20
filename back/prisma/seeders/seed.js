const { prisma } = requier('../../src/db');

async function main() {

    await prisma.category.createMany({
        data: [
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
        ],
    });
    
    await prisma.shippingWay.createMany({
        data: [
            {
                name: 'Personal delivery',
            },
            {
                name: 'External courier',
            },
            {
                name: 'Meet in public place',
            },
            {
                name: 'Pickup in my house',
            },
        ]
    });

    console.log('Categories seeded');
    console.log('---------------------------------');    

    
}