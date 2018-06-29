using System;
using System.ComponentModel.DataAnnotations;

namespace hzero.efcodefirst.DataModel
{
    public class Player
    {
        [Key]
        public Guid Uid { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}