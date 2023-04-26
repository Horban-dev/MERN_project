import React, {useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../constans/productConstans'


const ProductListScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList)
    const {loading, error, products} = productList;

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin;


    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    

    const productCreate = useSelector((state) => state.productCreate)
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: createdProduct,
    } = productCreate

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo || !userInfo.data.isAdmin) {
            navigate('/login')
        } 

        if(successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, userInfo, navigate, successDelete, successCreate, createdProduct])

    const deletHandler = (id) => {
       dispatch(deleteProduct(id))
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }
    return (
        <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className="text-end">
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
         {loading ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deletHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
         )}   
        </>
    );
};

export default ProductListScreen;