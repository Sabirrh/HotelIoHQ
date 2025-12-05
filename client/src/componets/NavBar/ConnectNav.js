import { useSelector } from "react-redux";
import { Card, Avatar, Badge, Space } from 'antd';
import moment from 'moment';
import {
    getAccountBalance,
    currencyFormatter,
    payoutSetting
} from "../../actions/stripe";
import { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState('');
    const auth = useSelector(state => state.auth);
    const user = auth?.user;


    useEffect(() => {
        getAccountBalance(auth.token).then(res => {
            console.log(res);
            setBalance(res.data);
        })
    }, [])

    const handlePayoutSettings = async () => {
        setLoading(true);
        try {
            const res = await payoutSetting(auth.token);
            if (res?.data?.url) {
                window.location.href = res.data.url; // redirect to Stripe settings
            } else {
                throw new Error("No URL received from payoutSetting response.");
            }
            // window.location.href = res.data.url;
            setLoading(false);
        } catch (err) {
            console.log("Payout settings error:", err);
            setLoading(false)
            toast.error("Unable to access payout settings. Please try again.");
        }
    }

    if (!user || !user.name) return null;
    // return (
    //     <>
    //         <div className="d-flex justify-content-center mt-4">
    //             <Space size="large">
    //                 <Card hoverable
    //                     style={{ width: 260 }}
    //                     className="shadow-sm rounded">
    //                     <Meta
    //                         avatar={<Avatar>{user.name[0]}</Avatar>}
    //                         // avatar={<Avatar>{user?.name?.[0] || "U"}</Avatar>}
    //                         title={user.name}
    //                         description={`Joined ${moment(user.createdAt).fromNow()}`}
    //                     />
    //                 </Card>
    //                 {/* {auth && auth.user && auth.user.stripe_seller &&
    //             auth.user.stripe_seller.charges_enabled &&
    //             (<>
    //                 <div>Pending </div>
    //                 <div>Payout Setting</div>
    //             </>)} */}

    //                 {user?.stripe_seller?.charges_enabled && (
    //                     <>
    //                         <Ribbon text='Available' color="gray">
    //                             <Card className="bg-light pt-1">
    //                                 {balance && Array.isArray(balance.pending) && balance.pending.map((b, index) => (
    //                                     <span key={index} className="lead"
    //                                         style={{ cursor: "pointer" }}
    //                                     >
    //                                         {/* {b.amount} {b.currency.toUpperCase()} */}
    //                                         {currencyFormatter(b)}
    //                                     </span>
    //                                 ))}
    //                             </Card>
    //                         </Ribbon>
    //                         <Ribbon text='payouts' color="silver">
    //                             <Card onClick={handlePayoutSettings}
    //                                 style={{ cursor: "pointer" }}
    //                             >
    //                                 <SettingOutlined classID="h5 pt-2" />
    //                             </Card>
    //                         </Ribbon>

    //                     </>
    //                 )}
    //             </Space>
    //         </div>
    //     </>
    // )
    return (
        <>
            <div className="container py-3 mt-4">
                <div className="row g-3 align-items-center justify-content-between">
                    {/* NAME PLATE */}
                    <div className="col-auto">
                        <Card
                            hoverable
                            className="shadow-sm rounded-3 text-center"
                            bodyStyle={{ padding: "18px 28px" }}
                        >
                            <Meta
                                avatar={
                                    <Avatar
                                        size={70}
                                        style={{
                                            backgroundColor: "#1890ff",
                                            fontSize: 32,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {user.name[0]}
                                    </Avatar>
                                }
                                title={<span className="fw-bold fs-5">{user.name}</span>}
                                description={
                                    <span className="text-muted small">
                                        Joined {moment(user.createdAt).fromNow()}
                                    </span>
                                }
                            />
                        </Card>
                    </div>

                    {/* SPACER (invisible column) */}
                    <div className="col-12 col-md-1"></div>

                    {/* AVAILABLE BALANCE */}
                    {user?.stripe_seller?.charges_enabled && (
                        <>
                            <div className="col-auto">
                            <Ribbon text="Available" color="gray">
                                <Card
                                    size="small"
                                    className="shadow-sm rounded-3 text-center"
                                    bodyStyle={{ padding: "20px 32px" }}
                                >
                                    <div className="text-muted small mb-1">Available</div>
                                    <div className="lead fw-semibold">
                                        {balance &&
                                            Array.isArray(balance.pending) &&
                                            balance.pending.map((b, i) => (
                                                <span key={i}>{currencyFormatter(b)}</span>
                                            ))}
                                    </div>
                                </Card>
                                </Ribbon>
                            </div>

                            {/* PAYOUT SETTINGS */}
                            <div className="col-auto">
                            <Ribbon text='setting' color="gray">
                                <Card
                                    hoverable
                                    loading={loading}
                                    onClick={handlePayoutSettings}
                                    className="shadow-sm rounded-3 text-center"
                                    bodyStyle={{ padding: "20px 32px", cursor: "pointer" }}
                                >
                                    <div className="text-muted small mb-1">Settings</div>
                                    <SettingOutlined
                                        style={{ fontSize: 30, color: "#595959" }}
                                    />
                                </Card>
                                </Ribbon>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ConnectNav;