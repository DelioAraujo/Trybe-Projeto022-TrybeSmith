import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsServices from '../../../src/services/products.services';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('retorno correto da lista de produtos', async function () {
    const getAllListMock = [
      { id: 1, name: 'Product 1', price: 'Price 1', orderId: 1 },
      { id: 2, name: 'Product 2', price: 'Price 2', orderId: 2 },
    ];

    const getAllReturnMock = getAllListMock.map((Product) => ProductModel.build(Product));

    const findAllStub = sinon.stub(ProductModel, 'findAll').resolves(getAllReturnMock);

    const findAll = await productsServices.findAll();

    expect(findAllStub).to.have.been.calledOnce;
    expect(findAll).to.be.an('array');

  });

  it('retorno correto ao criar um produto', async function () {
    const mockProduct = {
      name: 'Martelo de Thor',
      price: '30 peças de ouro',
      orderId: 4,
    };

    const createProductStub = sinon.stub().resolves({ dataValues: mockProduct });

    sinon.replace(ProductModel, 'create', createProductStub);

    const createProduct = await productsServices.create(mockProduct.name, mockProduct.price, mockProduct.orderId);

    expect(createProductStub).to.have.been.calledWith(mockProduct);

  });

});
